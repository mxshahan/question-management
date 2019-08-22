import React from 'react';
import { MENU_ENLARGED } from '../../config';

export default class DashCtx extends React.Component {
    state = {
        menuEnlarge: false,
        menuCollapse: false,
        menu: 0
    }

    intSlimscrollmenu = () => {
        window.$('.slimscroll-menu').slimscroll({
            height: 'auto',
            position: 'right',
            size: "5px",
            color: '#9ea5ab',
            wheelStep: 5,
            touchScrollStep: 50
        });
    }

    initMetisMenu = () => {
        //metis menu
        window.$("#side-menu").metisMenu();
    }

    initLeftMenuCollapse = () => {
        let self = this;
        // Left menu collapse
        window.$('.button-menu-mobile').on('click', function (event) {
            event.preventDefault();
            window.$("#root").toggleClass("enlarged");
            console.log(window.$('#root').attr('class'))
            if (window.$('#root').attr('class') === 'enlarged') {
                self.handleMenuEnlarged(true)
                return true;
            } else {
                self.handleMenuEnlarged(false)
                return false
            }
        });
    }

    initMenuEnlarge = () => {

    }

    handleMenuEnlarged = (status) => {
        this.props.dispatch({
            type: MENU_ENLARGED,
            payload: status
        })
    }
}

export const DashContext = (DashCtx);