import { CommonModule } from '@angular/common';
import { Component, Input, type OnInit, SimpleChanges } from '@angular/core';
import { DATA } from './consts/data.const';
import { amex, amex_single, diners, diners_single, discover, discover_single, jcb, jcb_single, maestro, maestro_single, mastercard, mastercard_single, unionpay, unionpay_single, visa, visa_single } from './consts/svg-icons.cons';
import { TCard } from '../public-api';

@Component({
    selector: 'ngx-credit-card',
    standalone: true,
    imports: [
        CommonModule,
    ],
    templateUrl: './ngx-credit-card.component.html',
    styleUrls: ['./ngx-credit-card.component.scss'],
})
export class NgxCreditCardComponent {

    @Input() card: TCard = {
        name: 'Juan Alberto',
        number: '0123456789101112',
        expiration: '01/24',
        security_code: ''
    }

    ccicon: string = ''
    ccsingle: string = ''
    themeLight: string = ''
    themeDark: string = ''

    ngOnChanges() {

        const typeCard = this.getTypeCard(this.card.number)

        console.log(typeCard)

        if (typeCard) {
            this.changeStyle(typeCard.cardtype)
        } else {
            this.changeStyle('none')
        }

    }

    getTypeCard(card_number: string) {
        var number = (card_number).replace(/\D/g, '');

        for (var i = 0; i < DATA.length; i++) {
            const mask = DATA[i]
            let re = new RegExp(mask.regex);
            if (number.match(re) != null) {
                return mask;
            }
        }

        return false
    }

    changeStyle(cardtype: string) {
        switch (cardtype) {
            case 'american express':
                this.ccicon = amex;
                this.ccsingle = amex_single;
                this.swapColor('green');
                break;
            case 'visa':
                this.ccicon = visa;
                this.ccsingle = visa_single;
                this.swapColor('lime');
                break;
            case 'diners':
                this.ccicon = diners;
                this.ccsingle = diners_single;
                this.swapColor('orange');
                break;
            case 'discover':
                this.ccicon = discover;
                this.ccsingle = discover_single;
                this.swapColor('purple');
                break;
            case ('jcb' || 'jcb15'):
                this.ccicon = jcb;
                this.ccsingle = jcb_single;
                this.swapColor('red');
                break;
            case 'maestro':
                this.ccicon = maestro;
                this.ccsingle = maestro_single;
                this.swapColor('yellow');
                break;
            case 'mastercard':
                this.ccicon = mastercard;
                this.ccsingle = mastercard_single;
                this.swapColor('lightblue');
                break;
            case 'unionpay':
                this.ccicon = unionpay;
                this.ccsingle = unionpay_single;
                this.swapColor('cyan');
                break;
            default:
                this.ccicon = '';
                this.ccsingle = '';
                this.swapColor('grey');
                break;
        }
    }

    swapColor(color: string) {
        this.themeLight = 'lightcolor ' + color
        this.themeDark = 'darkcolor ' + color + 'dark'
    }



}
