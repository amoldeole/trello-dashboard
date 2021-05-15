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
  @Output() addCard: EventEmitter<boolean> = new EventEmitter<boolean>();
  @ViewChild('cardcontainer', { read: ViewContainerRef }) cardContainerRef: ViewContainerRef;
  @ViewChild('cardcontainer') cardcontainer: CardComponent;
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
    compInstance.description = card ? card.description : 'Some quick example text to build on the card title and make up the bulk of the cards content.'
    this.registerRemoveEvent(compInstance);
    this.cardComponents.push(compInstance);
    this.cardIndex++;
    this.addCard.emit(true);
  }

  removeCardList(): void {
    this.remove.emit(this);
  }

  private registerRemoveEvent(compInstance: CardComponent) {
    compInstance.remove.subscribe((comp: CardComponent) => {
      const componentIndex = this.cardComponents.indexOf(comp);
      if (componentIndex !== -1) {
        this.cardContainerRef.remove(componentIndex);
        this.cardComponents.splice(componentIndex, 1);
        if (!this.cardComponents.length) {
          this.cardIndex = 1;
        }
      }
    });
  }
}
