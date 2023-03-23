import path from 'path'
import fs from 'fs'

export const walk = (dir: string, subDir: string = '') => {
    const res: any[] = []
    const list: string[]  = fs.readdirSync(dir + subDir)
    list.forEach(file => {
        file = dir + subDir + '/' + file
        // console.log(file)  查看路径
        if (path.extname(file) === '.md') {
            res.push(file)
        }
    })

    const items: any[] = res.map(i => ({ 
        text: path.basename(i, '.md'),
        link: i.slice(6, -3)
    }))

    return {
        text: subDir,
        collapsed: true,
        items
    }
}
