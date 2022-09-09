import { sleep } from 'antd-mobile/es/utils/sleep'

let count = 0

export async function mockRequest () {
  if (count >= 5) {
    return []
  }
  await sleep(2000)
  count++
  return [
    { name: '第2课', id: 11 },
    { name: '第12课', id: 22 },
    { name: '第44课', id: 33 }
  ]
}
