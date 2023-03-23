import { walk } from './utils'

const BASE_DIR = './docs/notes/'

export const mySidebar: any[] = [
    walk(BASE_DIR, 'JavaScript'),
    walk(BASE_DIR, 'Typescript'),
    walk(BASE_DIR, 'Vue'),
    walk(BASE_DIR, 'React'),
    walk(BASE_DIR, 'Node'),
    walk(BASE_DIR, '前端工程化'),
    walk(BASE_DIR, 'Utils'),
    walk(BASE_DIR, 'Others'),
    walk(BASE_DIR, 'Go'),
    walk(BASE_DIR, 'Python'),
    walk(BASE_DIR, '计算机网络'),
    walk(BASE_DIR, '数据结构和算法')
]