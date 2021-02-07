// フレームレート選択肢
const frame_rate_items = [
    { value: 24, name: "24fps" },
    { value: 30, name: "30fps" },
    { value: 60, name: "60fps" },
];

var content = new Vue({
    el: "#app",
    data: {
        // 撮影間隔
        shooting_interval_value: 10,
        // フレームレート
        frame_rate_value: 30,
        // 撮影時間
        shooting_time_value: 30,
        // フレームレート選択肢
        frame_rate_items: frame_rate_items,
        // 再生時間
        play_time: null
    },
    mounted: function () {
        let that = this;
        let shooting_interval = that.shooting_interval_value;
        let frame_rate = that.frame_rate_value;
        let shooting_time = that.shooting_time_value;
        that.play_time = calculatingPlayTime(shooting_interval, frame_rate, shooting_time);
    },
    methods: {
        onChangeInput() {
            let that = this;
            let shooting_interval = that.shooting_interval_value;
            let frame_rate = that.frame_rate_value;
            let shooting_time = that.shooting_time_value;
            that.play_time = calculatingPlayTime(shooting_interval, frame_rate, shooting_time);
        }
    }
});

/**
 * 再生時間計算
 * @param {*} shooting_interval 
 * @param {*} frame_rate 
 * @param {*} shooting_time 
 */
function calculatingPlayTime(shooting_interval, frame_rate, shooting_time) {
    let play_time = 0;
    let result = "";
    
    // 撮影時間を秒に変換
    shooting_time = shooting_time * 60;

    // 撮影時間を撮影間隔で割り、撮影枚数を求める
    let shooting_number = shooting_time / shooting_interval;

    // 撮影枚数をフレームレートで割り、再生時間を求める
    play_time = shooting_number / frame_rate;

    // 再生時間が1分未満の場合
    if (play_time < 60) {
        result = play_time + '秒';
        return result;

    // 再生時間が1分以上かつ1時間未満の場合
    } else if (play_time >= 60 && play_time < 3600) {

        let play_time_minute = Math.floor(play_time / 60);
        let play_time_second = play_time % 60;

        result = play_time_minute + '分' + play_time_second + '秒';
        return result;

    // 再生時間が1時間以上の場合
    } else {
        let play_time_minute_hour = Math.floor(play_time / 3600);
        let play_time_minute = Math.floor((play_time % 3600) / 60);
        let play_time_second = (play_time % 3600) % 60;

        result = play_time_minute_hour + '時間' + play_time_minute + '分' + play_time_second + '秒';
        return result;

    }
    
}