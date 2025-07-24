$(document).ready(function () {
  const timeline = $(".timeline");
  const thumbs = $(".thumbs li");

  // 設定 timeline 的滑鼠拖移事件
  let isMouseDown = false; // 記錄是否按下鼠標
  let startX = 0; // 記錄鼠標按下的 X 位置
  let scrollLeft = 0; // 記錄 timeline 當前的滾動位置

  timeline.css("cursor", "grab"); // 設置為可拖動狀態
  // 當鼠標按下時，開始拖動
  timeline.on("mousedown", function (e) {
    isMouseDown = true;
    startX = e.pageX; // 記錄按下的 X 位置
    scrollLeft = timeline.scrollLeft(); // 記錄當前滾動位置
    timeline.css("cursor", "grabbing"); // 顯示拖動光標
  });
  // 當鼠標移動時，更新 timeline 的滾動位置
  timeline.on("mousemove", function (e) {
    if (!isMouseDown) return; // 如果鼠標沒按下，不做任何操作
    const diffX = e.pageX - startX; // 計算拖動的距離
    timeline.scrollLeft(scrollLeft - diffX); // 更新滾動位置
  });
  // 當鼠標放開時，停止拖動
  timeline.on("mouseup", function () {
    isMouseDown = false;
    timeline.css("cursor", "grab"); // 恢復為可抓取狀態
  });
  // 當鼠標離開時，也停止拖動
  timeline.on("mouseleave", function () {
    if (isMouseDown) {
      isMouseDown = false;
      timeline.css("cursor", "grab"); // 恢復為可抓取狀態
    }
  });

  // 幫 .thumbs 增加 .active
  function updateActiveState() {
    const $contentNew = $(".content"); // 獲取 .content 元素
    const contentRightEdge =
      $contentNew.offset().left + $contentNew.outerWidth(); // 計算 .content 的最右邊位置
    const contentLeftEdge = $contentNew.offset().left; // 計算 .content 的左邊位置

    $(".timeline li").each(function () {
      const $item = $(this);
      const itemLeftEdge = $item.offset().left; // 獲取 <li> 的左邊位置
      const itemRightEdge = itemLeftEdge + $item.outerWidth(); // 獲取 <li> 的右邊位置

      // 判斷 .timeline > li 超過畫面時移除 .active
      if (
        contentRightEdge - itemLeftEdge <= 50 ||
        itemRightEdge - contentLeftEdge <= -100
      ) {
        $item.removeClass("active");
      } else {
        $item.addClass("active");
        const itemClass = $item.attr("class");

        if (itemClass) {
          $(".thumbs li").each(function () {
            const $thumbItem = $(this);

            // 比對 .thumbs <li> 的 for 屬性和 .timeline <li> 的 class 名稱，相符時添加 active，否則移除 active
            const thumbFor = $thumbItem.attr("for");
            if (thumbFor && itemClass.includes(thumbFor)) {
              $thumbItem.addClass("active");
            } else {
              $thumbItem.removeClass("active");
            }
          });
        }

        // 檢查 .timeline 是否在最左邊
        if ($(".timeline").scrollLeft() === 0) {
          // 如果捲軸在最左邊，將 .thumbs 的第一個 <li> 設為 active
          $(".thumbs li").first().addClass("active");
          // 移除其他 <li> 的 .active
          $(".thumbs li").not(":first").removeClass("active");
        }
      }
    });
  }

  // 確保在頁面滾動或 resize 時觸發更新
  $(window).on("scroll resize", updateActiveState);

  // 當滾動 .timeline 時觸發檢查
  timeline.on("scroll", updateActiveState);
  updateActiveState(); // 初始化檢查

  // 點擊 .thumbs 中的項目時 .timeline 滑動到相對應的 <li>
  const content_center = $(".content").width() / 2;
  const y2000_offset = 0;
  const y2002_offset =
    $(".timeline .y2002").first().offset().left - content_center;
  const y2005_offset =
    $(".timeline .y2005").first().offset().left - content_center;
  const y2011_offset =
    $(".timeline .y2011").first().offset().left - content_center;
  const y2015_offset =
    $(".timeline .y2015").first().offset().left - content_center;
  const y2024_offset = $(".timeline .y2024").first().offset().left;

  thumbs.on("click", function () {
    const targetLi = $(this).attr("for"); // 取得對應的 id

    if (targetLi == "y2000") {
      timeline.animate(
        {
          scrollLeft: y2000_offset,
        },
        500
      );
    } else if (targetLi == "y2002") {
      timeline.animate(
        {
          scrollLeft: y2002_offset + 200,
        },
        500
      );
    } else if (targetLi == "y2005") {
      timeline.animate(
        {
          scrollLeft: y2005_offset,
        },
        500
      );
    } else if (targetLi == "y2011") {
      timeline.animate(
        {
          scrollLeft: y2011_offset + 150,
        },
        500
      );
    } else if (targetLi == "y2015") {
      timeline.animate(
        {
          scrollLeft: y2015_offset,
        },
        500
      );
    } else if (targetLi == "y2024") {
      timeline.animate(
        {
          scrollLeft: y2024_offset,
        },
        500
      );
    }
  });
});
