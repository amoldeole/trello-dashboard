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

  dragstart_handler(ev) {
    // Add the target element's id to the data transfer object
    ev.dataTransfer.setData("application/my-app", ev.target.id);
    ev.dataTransfer.effectAllowed = "move";
  }
}
