import { Component, ComponentFactoryResolver, ComponentRef, EventEmitter, Input, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { CardComponent } from './card/card.component';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.sass']
})

export class CardListComponent extends EventEmitter implements OnInit {
  title: string;
  cardComponents: CardComponent[];
  cardIndex: number;
  @Output() remove: EventEmitter<CardListComponent> = new EventEmitter<CardListComponent>();
  @Output() changeEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
  @ViewChild('cardcontainer', { read: ViewContainerRef }) cardContainerRef: ViewContainerRef;
  constructor(private resolver: ComponentFactoryResolver) {
    super();
    this.cardComponents = [];
    this.cardIndex = 1;
  }

  ngOnInit(): void { }

  createCardComponent(card?: CardComponent) {
    const factory = this.resolver.resolveComponentFactory(CardComponent);
    const cardListCompRef: ComponentRef<CardComponent> = this.cardContainerRef.createComponent(factory);
    const compInstance = cardListCompRef.instance;
    compInstance.title = card ? card.title : 'Card Title ' + this.cardIndex;
    compInstance.description = card ? card.description : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    this.registerRemoveEvent(compInstance);
    this.cardComponents.push(compInstance);
    this.cardIndex++;
    this.changeEvent.emit(true);
  }

  removeCardList(): void {
    this.remove.emit(this);
    this.changeEvent.emit(true);
  }

  dragover_handler(ev) {
    ev.preventDefault();
    ev.dataTransfer.dropEffect = "move"
   }
   
   drop_handler(ev) {
    ev.preventDefault();
    const data = ev.dataTransfer.getData("application/my-app");
    ev.target.appendChild(document.getElementById(data));
  }

  private registerRemoveEvent(compInstance: CardComponent) {
    compInstance.remove.subscribe((comp: CardComponent) => {
      const componentIndex = this.cardComponents.indexOf(comp);
      if (componentIndex !== -1) {
        this.cardContainerRef.remove(componentIndex);
        this.cardComponents.splice(componentIndex, 1);
        this.changeEvent.emit(true);
        if (!this.cardComponents.length) {
          this.cardIndex = 1;
        }
      }
    });
  }
}
