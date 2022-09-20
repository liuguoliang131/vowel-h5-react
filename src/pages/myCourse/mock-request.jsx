import { sleep } from 'antd-mobile/es/utils/sleep'

export async function mockRequest () {
  await sleep(1000)
  return {
    code: 0,
    data: {
      push_award_time: 1231231231,
      expiration_time: 1241443232,
      list: [
        {
          id: 1,
          title: 'asdasdsa',
          note: 'asdasdasdsa',
          img_url: 'http://www.baidu.com/video/123',
          video_url: 'asdasdasd',
          video_time: 'asdasdad'
        },
        {
          id: 12341,
          title: 'asdasdsa',
          note: 'asdasdasdsa',
          img_url: 'http://www.baidu.com/video/123',
          video_url: 'asdasdasd',
          video_time: 'asdasdad'
        },
        {
          id: 122,
          title: 'asdasdsa',
          note: 'asdasdasdsa',
          img_url: 'http://www.baidu.com/video/123',
          video_url: 'asdasdasd',
          video_time: 'asdasdad'
        },
        {
          id: 123,
          title: 'asdasdsa',
          note: 'asdasdasdsa',
          img_url: 'http://www.baidu.com/video/123',
          video_url: 'asdasdasd',
          video_time: 'asdasdad'
        }
      ]
    }
  }
}
