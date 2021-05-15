import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CardListComponent } from "../card-list/card-list.component";
import { CardComponent } from "../card-list/card/card.component";
import { DashboardRoutingModule } from "./dashboard-routing.module";
import { DashboardComponent } from "./dashboard.component";

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports:[DashboardRoutingModule, CommonModule, FormsModule],
  entryComponents: [CardListComponent, CardComponent],
  exports: [
    DashboardComponent
  ]
})
export class DashboardModule { }
