// APlayer
const aPlayer = document.querySelector("#aplayer");
if (aPlayer) {
    let dataSong = aPlayer.getAttribute("data-song");
    dataSong= JSON.parse(dataSong);
    let dataSinger =aPlayer.getAttribute("data-singer");
    dataSinger = JSON.parse(dataSinger);

    const ap = new APlayer({
        container: aPlayer,
        audio: [{
            name: dataSong.title,
            artist: dataSinger.fullName,
            url: dataSong.audio,
            cover: dataSong.avatar
        }],
        autoplay:true
    });

    const avatar = document.querySelector(".singer-detail .inner-avatar");
    // css cho avatar
    // xử lí sự kiện khi bấm play bài hát và khi dừng bài hát
    ap.on('play', function () {
        avatar.style.animationPlayState ="running";;
    });
    ap.on('pause', function () {
        avatar.style.animationPlayState ="paused";;
    });
}

// end APlayer

// button-like
const buttonLike = document.querySelector("[button-like]");
if (buttonLike){
    buttonLike.addEventListener("click",()=>{
        const idSong = buttonLike.getAttribute("button-like");
        const isActive = buttonLike.classList.contains("active");//kiểm tra có class avtive không
        const typeLike = isActive? "dislike":"like"
        const link =`/songs/like/${typeLike}/${idSong}`;
        
        const option = {
            method:"PATCH"
        }
        fetch(link,option)
            .then(res=>res.json())
            .then(data=>{
                const span = buttonLike.querySelector("span");
                span.innerHTML=`${data.like} thích`;
                buttonLike.classList.toggle("active");
                console.log(data);
            })

    })
}
// end button-like