import { Component, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

export interface tasks{
  TASK_ID:number;
  USERNAME:string,
  TITLE:string,
  DESCRIPTION : string,
  CREATED_DTM : Date,
  IS_COMPLETED : boolean,
  COMPLETED_DTM : Date,
  IS_EDITED:boolean,
  EDITED_DTM : Date
  DELETED_DTM: Date,
}

@Component({
  selector: 'app-modal-box',
  templateUrl: './modal-box.component.html',
  styleUrls: ['./modal-box.component.scss']
})
export class ModalBoxComponent {

  action: string;
  local_data: any;
  cancel: string = 'Cancel';
  ngForm !: FormGroup;
  addUpdateForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ModalBoxComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: tasks,
    private formBuilder: FormBuilder,) {
    this.local_data = { ...data };
    this.action = this.local_data.action;
    this.updateTaskFormValidations();
    this.addUpdateForm.patchValue(this.local_data);
  }

  updateTaskFormValidations(): void {
    this.addUpdateForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
     
    });
  }

  closeDialog() {
    this.dialogRef.close({ data: { action: 'Cancel' } });
  }

  onSubmit(): void {
    this.dialogRef.close({ data: { action: this.action, data: this.addUpdateForm.value } });
  }
}