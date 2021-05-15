import {
  OnInit,
  Component,
  ViewChild,
  ViewContainerRef,
  ComponentFactoryResolver,
  ComponentRef,
  ComponentFactory,
  ChangeDetectorRef
} from '@angular/core';
import { CardListComponent } from '../card-list/card-list.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {
  cardListComponent: CardListComponent[];
  listIndex: number;

  @ViewChild('listcontainer', { read: ViewContainerRef }) viewContainerRef: ViewContainerRef;
  @ViewChild('listcontainer') listcontainer: CardListComponent;
  constructor(private resolver: ComponentFactoryResolver) {
    this.listIndex = 1;
    this.cardListComponent = [];
  }

  ngOnInit(): void {
  }

  createCardListComponent(cardListComponent?: CardListComponent) {
    const factory = this.resolver.resolveComponentFactory(CardListComponent);
    const cardListCompRef: ComponentRef<CardListComponent> = this.viewContainerRef.createComponent(factory);
    const compInstance = cardListCompRef.instance;
    compInstance.title = cardListComponent ? cardListComponent.title : 'Title ' + this.listIndex;
    this.registerAddEvent(compInstance);
    this.registerRemoveEvent(compInstance);
    this.cardListComponent.push(compInstance);
    this.listIndex++;
    this.parseListData();
  }

  parseListData(): void {
    const parsedData = this.cardListComponent.map((value: CardListComponent) => {
      return <CardListComponent>{
        title: value.title,
        cardComponents: value.cardComponents.map(card => {
          return { title: card.title, description: card.description };
        }),
        cardIndex: value.cardIndex
      };
    });
    console.log(this.cardListComponent);

    localStorage.setItem('cardList', JSON.stringify(parsedData));
  }

  private registerRemoveEvent(compInstance: CardListComponent) {
    compInstance.remove.subscribe((comp: CardListComponent) => {
      const componentIndex = this.cardListComponent.indexOf(comp);
      if (componentIndex !== -1) {
        this.viewContainerRef.remove(componentIndex);
        this.cardListComponent.splice(componentIndex, 1);
        if (!this.cardListComponent.length) {
          this.listIndex = 1;
        }
      }
    });
  }

  registerAddEvent(compInstance: CardListComponent): void {
    compInstance.addCard.subscribe((comp: CardListComponent) => {
      this.parseListData();
    });
  }
}
