import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.sass']
})
export class CardComponent extends EventEmitter implements OnInit {
  title: string;
  description: string;
  @Output() remove:EventEmitter<CardComponent> = new EventEmitter<CardComponent>();
  constructor() { 
    super();
  }
  ngOnInit(): void {}

  removeCard(): void {
    this.remove.emit(this);
  }
}
