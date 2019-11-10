import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'numberToTime'
})
export class NumberToTimePipe implements PipeTransform {
    transform(value: number): any {
        if (!isNaN(value)) {
            let prefix = ''; // stabilisce se c'è un - se negativo
            if (value < 0) {
                value = Math.abs(value);
                prefix = '-';
            }
            const hours = Math.floor(value / 3600);
            const minutes = Math.floor((value - hours * 3600) / 60);
            const seconds = value - hours * 3600 - minutes * 60;
            return (
                prefix +
                ('0' + hours).substr(-2) +
                ':' +
                ('0' + minutes).substr(-2) +
                ':' +
                ('0' + seconds).substr(-2)
            );
            // tslint:disable-next-line: max-line-length
            // substr(-2) prende la sottostringa con gli ultimi due chars.....quindi se ore: 1 => 0+1 = 01 = 01.....se ore: 10 => 0 + 10 = 010 = 10
        }
        return null;
    }
}
