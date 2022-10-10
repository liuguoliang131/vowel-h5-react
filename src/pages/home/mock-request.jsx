import { sleep } from 'antd-mobile/es/utils/sleep'

export async function mockRequest () {
  await sleep(2000)
  return {
    data: {
      id: 17,
      type: 1,
      title: '幸运大抽奖11',
      sub_title: '0918-测试活动，预热+正在进行2',
      rule_note: '活动规则0918-测试活动，预热+正在进行2',
      status: 1,
      start_time: 1665381588,
      end_time: 1669880839,
      draw_start_time: 1665381588,
      draw_end_time: 1669880839,
      prize_list: [
        {
          id: 5,
          title: '苹果手表S7',
          note: '苹果手表S7',
          pic_url: 'https://file.yuanyinfu.com/operate/prize/手表2.png',
          type: 1
        },
        {
          id: 6,
          title: '苹果耳机pro版',
          note: '苹果耳机pro版',
          pic_url: 'https://file.yuanyinfu.com/operate/prize/耳机2.png',
          type: 1
        },
        {
          id: 7,
          title: '免单奖励',
          note: '免单奖励',
          pic_url: 'https://file.yuanyinfu.com/operate/prize/免单卡.png',
          type: 1
        },
        {
          id: 8,
          title: '索尼运动耳机',
          note: '索尼运动耳机',
          pic_url: 'https://file.yuanyinfu.com/operate/prize/耳机1.png',
          type: 1
        },
        {
          id: 9,
          title: '300奇点积分包',
          note: '300奇点积分包',
          pic_url: 'https://file.yuanyinfu.com/operate/prize/1000006207.png',
          type: 2
        },
        {
          id: 10,
          title: '500奇点积分包',
          note: '500奇点积分包',
          pic_url: 'https://file.yuanyinfu.com/operate/prize/1000006083.png',
          type: 2
        },
        {
          id: 11,
          title: '800奇点积分包',
          note: '800奇点积分包',
          pic_url: 'https://file.yuanyinfu.com/operate/prize/1000006208.png',
          type: 2
        },
        {
          id: 12,
          title: '1000奇点积分包',
          note: '1000奇点积分包',
          pic_url: 'https://file.yuanyinfu.com/operate/prize/1000006209.png',
          type: 2
        },
        {
          id: 13,
          title: '一路听天下读书年卡',
          note: '一路听天下读书年卡',
          pic_url: 'https://file.yuanyinfu.com/operate/prize/1000006202.png',
          type: 3
        },
        {
          id: 14,
          title: '元音符VIP专属尤克里里课程',
          note: '元音符VIP专属尤克里里课程',
          pic_url: 'https://file.yuanyinfu.com/operate/prize/1000006210.png',
          type: 4
        },
        {
          id: 15,
          title: '元音符VIP专属乐理课程',
          note: '元音符VIP专属乐理课程',
          pic_url: 'https://file.yuanyinfu.com/operate/prize/1000006083-1.png',
          type: 4
        },
        {
          id: 16,
          title: '谢谢惠顾',
          note: '谢谢惠顾',
          pic_url: 'https://file.yuanyinfu.com/operate/prize/1000006085.png',
          type: 5
        }
      ],
      task_list: [
        {
          type: 1,
          reach_num: 0,
          give_num: 1
        },
        {
          type: 3,
          reach_num: 3,
          give_num: 1
        },
        {
          type: 2,
          reach_num: 0,
          give_num: 3
        }
      ],
      pic_list: [
        'https://file.yuanyinfu.com/operate/promotion/voice-promotion-1663481066826.png',
        'https://file.yuanyinfu.com/operate/promotion/voice-promotion-1663481069508.png'
      ],
      main_img: 'https://file.yuanyinfu.com/operate/promotion/voice-promotion-1663481055507.png',
      user_info: {
        user_id: 100446,
        remain_award_num: 1,
        share_award_num: 0,
        share_user_num: 0
      },
      music_info: {
        id: 0,
        music_time: '233',
        music_pic: 'https://media.shenglangnft.com/poster/1663478955124581.jpeg?imageView2/2/w/300/h/300',
        music_pic_shear: '',
        music_url: 'https://media.shenglangnft.com/music/165692757279167.mp3',
        visit_num: '',
        music_name: 'giao',
        play_num: 0,
        like_num: 0,
        is_like: 0,
        share_h5_url: '',
        avatar: 'https://media.shenglangnft.com/avatar/165821988149739.jpeg',
        author_name: '域名资源-艺人姓名',
        music_info_id: 329,
        music_status: 0,
        lyrics: ''
      },
      share_info: {
        user_name: '',
        user_avatar: ''
      },
      is_first: 0,
      rule_node: `
      <div>
        <p style="font-weight: 700;">【抽奖规则】</p>
        <p style="white-space: wrap;">
        1. 用户每日进入活动页，即获取1次抽奖次数，最多可获得2次。<br />2. 用户每邀请2位新用户参与抽奖，即可获取1次抽奖次数。<br />3. 用户购买数字音乐版权，每份可额外增加1次抽奖次数。<br />4. 预约购买后，抽奖次数将在开售抢购成功后进行显示，未抢购成功将无法获取抽奖次数。<br />5. 抽奖时间于10月13日15:00开启，18:00前抽奖完成，超时未抽奖，视为自动放弃抽奖权益。<br />6. 兑换奖励：虚拟奖励及时发放，实物奖励将于48小时内联系客服进行领取。<br />7. 本次活动最终解释权由元音符所有。
        </p>
      </div>`

    }
  }
}
