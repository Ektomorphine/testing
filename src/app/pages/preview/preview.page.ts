import { Component, NgModule, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'preview-page',
  templateUrl: 'preview.page.html',
  styleUrls: ['preview.page.scss']
})

export class PreviewPage  {
  constructor(public dialogRef: MatDialogRef<PreviewPage>,
              @Inject(MAT_DIALOG_DATA) public data: any) {}
}
