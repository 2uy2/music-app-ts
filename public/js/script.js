// APlayer
const aPlayer = document.querySelector("#aplayer");
if (aPlayer) {
    let dataSong = aPlayer.getAttribute("data-song");
    dataSong = JSON.parse(dataSong);
    let dataSinger = aPlayer.getAttribute("data-singer");
    dataSinger = JSON.parse(dataSinger);

    const ap = new APlayer({
        container: aPlayer,
        lrcType: 1,
        audio: [{
            name: dataSong.title,
            artist: dataSinger.fullName,
            url: dataSong.audio,
            cover: dataSong.avatar,
            lrc:dataSong.lyrics
        }],
        autoplay: true
    });

    const avatar = document.querySelector(".singer-detail .inner-avatar");
    // css cho avatar
    // xử lí sự kiện khi bấm play bài hát và khi dừng bài hát
    ap.on('play', function () {
        avatar.style.animationPlayState = "running";;
    });
    ap.on('pause', function () {
        avatar.style.animationPlayState = "paused";;
    });
    ap.on('ended', function () { //xử lý sau khi kết thúc bài hát
        const link = `/songs/listen/${dataSong._id}`;

        const option = {
            method: "PATCH"
        }
        fetch(link, option)
            .then(res => res.json())
            .then(data => {
                const elementInnerListen = document.querySelector(".singer-detail .inner-listen span");
                elementInnerListen.innerHTML=`${data.listen} lượt nghe`
                
            })
    });
}

// end APlayer

// button-like
const listButtonLike = document.querySelectorAll("[button-like]");
if (listButtonLike.length > 0) {
    listButtonLike.forEach(buttonLike => {
        buttonLike.addEventListener("click", () => {
            const idSong = buttonLike.getAttribute("button-like");
            const isActive = buttonLike.classList.contains("active"); //kiểm tra có class avtive không
            const typeLike = isActive ? "dislike" : "like"
            const link = `/songs/like/${typeLike}/${idSong}`;

            const option = {
                method: "PATCH"
            }
            fetch(link, option)
                .then(res => res.json())
                .then(data => {
                    if (data.code == 200) {
                        const span = buttonLike.querySelector("span");
                        span.innerHTML = `${data.like} thích`;
                        buttonLike.classList.toggle("active");
                        console.log(data);
                    }
                })

        })
    });

}
// end button-like
// button-favorite
const buttonFavorite = document.querySelector("[button-favorite]");

if (buttonFavorite) {
    buttonFavorite.addEventListener("click", () => {
        const idSong = buttonFavorite.getAttribute("button-favorite");

        const isActive = buttonFavorite.classList.contains("active"); //kiểm tra có class avtive không
        const typeFavorite = isActive ? "unfavorite" : "favorite"
        const link = `/songs/favorite/${typeFavorite}/${idSong}`;

        const option = {
            method: "PATCH"
        }
        fetch(link, option)
            .then(res => res.json())
            .then(data => {
                if (data.code == 200) {
                    buttonFavorite.classList.toggle("active");
                }

            })

    })
}
// end button-like

// search suggest
const boxSearch = document.querySelector(".box-search");
if (boxSearch) {
    const input = boxSearch.querySelector("input[name='keyword']");
    const boxSuggest = document.querySelector(".inner-suggest");
    input.addEventListener("keyup", () => {
        const keyword = input.value;
        // 👉 Nếu input trống → tắt gợi ý
        if (keyword.trim() === "") {
            boxSuggest.classList.remove("show");
            
            return;
        }

        const link = `/search/suggest?keyword=${keyword}`;
        const option = {
            method: "GET", //phương thức get cũng không cần cấu hình
        }
        fetch(link, option)
            .then(res => res.json())
            .then(data => {

                const songs = data.songs;
                if (songs.length > 0) {
                    boxSuggest.classList.add("show");
                    const htmls = songs.map((song) => {
                        return `
                           <a href="/songs/detail/${song.slug}" class="inner-item">
                                <div class="inner-image">
                                    <img src=${song.avatar} />
                                </div>

                                <div class="inner-info">
                                    <div class="inner-title">${song.title}</div>

                                    <div class="inner-singer">
                                        <i class="fa-solid fa-microphone-lines"></i>
                                        ${song.infoSinger.map(singer => singer.fullName).join(", ")}
                                    </div>
                                </div>
                            </a>
                        `
                    });
                    const boxList = boxSearch.querySelector(".inner-list");
                    boxList.innerHTML = htmls.join(""); //join biến 1 mảng thành 1 chuỗi
                } else {
                    boxSuggest.classList.remove("show");
                }
            })
    })
}
//end search suggest