import {
  OnInit,
  Component,
  ViewChild,
  ViewContainerRef,
  ComponentFactoryResolver,
  ComponentRef,
  ComponentFactory,
  ChangeDetectorRef,
  OnChanges,
  AfterViewInit,
  AfterViewChecked
} from '@angular/core';
import { CardListComponent } from '../card-list/card-list.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})

export class DashboardComponent implements AfterViewInit {
  cardListComponent: CardListComponent[];
  listIndex: number;

  @ViewChild('listcontainer', { read: ViewContainerRef }) viewContainerRef: ViewContainerRef;
  constructor(private resolver: ComponentFactoryResolver, private cdr: ChangeDetectorRef) {
    this.listIndex = 1;
    this.cardListComponent = [];
  }

  ngAfterViewInit(): void {
    this.initCardListComp();
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
    if (!!cardListComponent) {
      cardListComponent.cardComponents.forEach(card => {
        setTimeout(() => compInstance.createCardComponent(card));
      })
    } else {
      this.parseListData();
    }
    this.cdr.detectChanges();
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
    compInstance.changeEvent.subscribe((comp: CardListComponent) => {
      this.parseListData();
    });
  }

  private initCardListComp() {
    const cardListData = localStorage.getItem('cardList');
    if (!!cardListData) {
      const cardComponents: CardListComponent[] = JSON.parse(cardListData)
      cardComponents.forEach(list => {
        this.createCardListComponent(list);
      });
    }
  }
}
