import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  dark: boolean;

  constructor() {
    this.dark = false;
  }

  ngOnInit(): void {
  }

  changeTheme(){
    if (!this.dark) {
      document.querySelector('body').classList.add('dark');
      this.dark = true;
    } else {
      document.querySelector('body').classList.remove('dark');
      this.dark = false;
    }
  }

}
