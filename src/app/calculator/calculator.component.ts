import { Component, OnInit, HostListener, Directive } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {
  x=0;
  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if ((event.key) == 'Backspace') {
      this.clean();
    }
    for (let index = 0; index < this.tavim.length; index++) {
      if (event.key == this.tavim[index]) {
        this.accountant(event.key);
      }
    }
  }
  left = '';
  right = '';
  tav = '';
  flagColor = false;
  flag = false;
  tavim: Array<string> = ['1', '2', '3', '+', '4', '5', '6', '*', '7', '8', '9', '/', '.', '0', '=', '-'];

  clickBtn(event?: MouseEvent) {
    this.accountant((event ? (event.target as HTMLElement).textContent : ''));
  }
  accountant(t: any) {
    if (((this.right == '' && this.tav != '') || (this.left == '')) && this.isChar(t) || (t == '.' && ((this.right != '' && this.right.indexOf(t) != -1) || (this.right == '' && this.tav != '') ||
      (this.right == '' && this.left != '' && this.left.indexOf(t) != -1) || this.left == '')) || (this.tav != '' && t == '-' && this.right == '')) {
      this.flagColor = true;
      setTimeout(() => {
        this.flagColor = false;
      }, 1000);
    }
    else if (this.tav != '' && (this.isChar(t) || t == '-') || t == '=') {
      this.outcome();
      if (t != '=')
        this.tav = t;
      if (this.left == '') {
        this.left = '-';
        this.tav = '';
      }
    }
    else if (this.tav == '' && (this.isChar(t) || t == '-')) {
      this.tav = t;
    }
    else if (this.tav == '' || (this.tav == '' && t == '-' && this.left == '')) {
      this.left += t; 
    }
    else if (this.tav != '') {
      this.right += t;
    }
  }
  isChar(t: any): Boolean {
    return t == '+' || t == '*' || t == '/';
  }
  outcome() {
    switch (this.tav) {
      case '+': {
        this.left = ((Number)(this.left) + (Number)(this.right)).toString();
        break;
      }
      case '-': {
        this.left = ((Number)(this.left) - (Number)(this.right)).toString();
        break;
      }
      case '/': {
        this.left = ((Number)(this.left) / (Number)(this.right)).toString();
        break;
      }
      case '*': {
        this.left = ((Number)(this.left) * (Number)(this.right)).toString();
        break;
      }
    }
    this.tav = '';
    this.right = '';
    if (this.left == "Infinity") {
      this.left = "ERROR";
      setTimeout(() => {
        this.left = '';
      }, 500);
    }
  }
  clean() {
    if (!this.flag) {
      this.flag = true;
      this.right != '' ? this.right = '' : this.tav != '' ? this.tav = '' : this.left = '';
    }
    else {
      this.flag = false;
      this.right = '';
      this.left = '';
      this.tav = '';
    }
  }
  constructor() {
  }
  ngOnInit(): void {
  }
}

