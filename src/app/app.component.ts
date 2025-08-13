import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  message! : string;

  constructor(private http : HttpClient){}

  ngOnInit(): void {
    // this.http.get<any>('http://localhost:3000/api/greet').subscribe(data => {
    //   this.message = data.message;
    // });
  }

}
