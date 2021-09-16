import vuePlugin from '@vitejs/plugin-vue'
import Markdown from 'vite-plugin-md'
import Components from 'unplugin-vue-components/vite'
 import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import matter from 'gray-matter'
import * as emoji from 'markdown-it-emoji'
import Pages from 'vite-plugin-pages'
import { resolve, join } from 'path'
import fs from 'fs'
import Prism from 'markdown-it-prism'

export default {
	resolve: {
		alias: {
			components: resolve(__dirname, 'src/components'),
			content: resolve(__dirname, 'src/content')
		},
	},
	plugins: [
		vuePlugin({
			include: [/\.vue$/, /\.md$/]
		}),
		Pages({
			extensions: ['vue', 'md'],
		}),
		Markdown({
			headEnabled: true,
			markdownItSetup(md) {
				// md.use(emoji)
				// md.use(require('markdown-it-highlightjs'), { inline: true })
				// https://prismjs.com/
				md.use(Prism)
			}
		}),
		virtualJson(),
		Components({
			resolvers: [
				ElementPlusResolver(),
			],
			include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
			dts: true,
		}),
	],
}

function virtualJson() {
  const virtualFileId = '@my-virtual-file'
  let blogMetadata = {}
  return {
    name: 'my-plugin', // required, will show up in warnings and errors
	enforce: 'pre',
    resolveId(id: string) {
		if (id === virtualFileId) {
			return virtualFileId
		}
		if(id.endsWith('.md')) {
			const path = join(__dirname, id)
			const source = fs.readFileSync(path)
			const { data } = matter(source)
			const fileName = id.replace(/.*\//g, '').replace(/.md.*/, '')
			blogMetadata = {
				...blogMetadata,		
				[fileName]: transformData(data)
			}
			
		}
		return null
    },
    load(id: string) {
      if (id === virtualFileId) {
		  console.log({ blogMetadata});
		  
       return  `export const postMeta = ${JSON.stringify(blogMetadata)}`
      }
    },
  }
}
interface IMeta {
	name: string,
	content: string
} 
interface IData {
	title: string,
	meta: Array<IMeta>,
	status: string,
	date: string
}
function transformData(data: IData) {

	const { content = '' } = (data?.meta ?? []).find((metatag: IMeta) => metatag.name === 'description') ?? {} as IMeta

	return {
		title: data.title,
		description: content,
		status: data.status,
		date: data.date
	}
}