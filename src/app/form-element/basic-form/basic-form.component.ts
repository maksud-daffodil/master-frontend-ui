import {Component, ViewChild} from '@angular/core';
import {FormsModule, NgForm} from "@angular/forms";
import {BasicForm} from "../../model/basicForm";
import { MessageService } from 'primeng/api';
import {CommonModule} from "@angular/common";
import { Toast } from 'primeng/toast';
import {NgOptionComponent, NgSelectComponent} from "@ng-select/ng-select";

@Component({
  selector: 'diu-basic-form',
  templateUrl: './basic-form.component.html',
  imports: [
    CommonModule,
    FormsModule,
    Toast,
    NgSelectComponent,
    NgOptionComponent,
  ],
  styleUrls: ['./basic-form.component.scss']
})
export class BasicFormComponent {
  @ViewChild('validationForm') form: NgForm | undefined;
  basicForm = new BasicForm();
  list: any = [];
  isSaveButton:boolean = true;
  isUpdateButton:boolean = false;

  constructor(
    private messageService: MessageService
  ) {}

  saveData(){
    this.list.push(this.basicForm);
    this.basicForm = new BasicForm();
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Message Content',
      life: 3000
    });
  }
  editData(data:any){
    this.basicForm = data;
    this.isUpdateButton = true;
    this.isSaveButton = false;
  }
  cancelData() {
    this.basicForm = new BasicForm();
    this.isSaveButton = true;
    this.isUpdateButton = false;
  }
  deleteData(data:any){
    this.list = this.list.filter((item: any)  => item !== data);
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Successfully Deleted',
      life: 3000
    });
  }

  updateData() {
    this.list.findIndex((item: BasicForm) => item === this.basicForm);
    // this.list[indexToUpdate] = response.data;
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Successfully Updated',
      life: 3000
    });
    this.basicForm = new BasicForm();
    this.isUpdateButton = false;
    this.isSaveButton = true;
  }
}
