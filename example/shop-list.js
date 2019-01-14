import UITableViewController from '@ui/UITableViewController.js';
import UIView from '@ui/view/UIView.js';
import UIImageView from '@ui/image/UIImageView.js';
import UIText from '@ui/text/UIText.js';
import Image from '@ui/image/Image.js';
import shoplist from './shop-list-data.js';
import s from './shop-list.css';

class ShopListPageController extends UITableViewController {
  constructor() {
    super()
  }
  onClickShopItem(shop, e) {
    console.error('onClickShopItem', shop, e);
  }
  renderRowView(shop) {
    const shopItemButtonView = new UIView();
    shopItemButtonView.addClass(s.shopItemButtonView);
    shopItemButtonView.addTarget(this, this.onClickShopItem.bind(this, shop));

    const shopImageView = new UIImageView();
    shopImageView.addClass(s.shopImageView);
    shopImageView.setImage(new Image(shop.picUrl, shop.shopName));

    const shopTitleView = new UIText();
    shopTitleView.addClass(s.shopTitleView);
    shopTitleView.setText(shop.shopName);

    shopItemButtonView.addSubView(shopImageView);
    shopItemButtonView.addSubView(shopTitleView);
    return shopItemButtonView;
  }
}
const {
  data: {
    shopList = []
  },
} = shoplist;

const shopListPageController = new ShopListPageController();
shopListPageController.setDataSource(shopList);

document.getElementById('app')
        .appendChild(shopListPageController.render());
