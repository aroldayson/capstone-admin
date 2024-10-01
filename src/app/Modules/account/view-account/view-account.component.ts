import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../admin.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-account',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,FormsModule],
  templateUrl: './view-account.component.html',
  styleUrls: ['./view-account.component.css'],
})
export class ViewAccountComponent {
  // Default image
  previewImageSrc: string =
    'http://simpleicon.com/wp-content/uploads/account.png';

  // Method to handle file input change
  onFileSelected(event: any): void {
    const file = event.target.files[0]; // Get the selected file
    if (file) {
      const reader = new FileReader(); // FileReader to read the image
      reader.onload = (e: any) => {
        this.previewImageSrc = e.target.result; // Set the preview image to the file content
      };
      reader.readAsDataURL(file); // Read the image file as a data URL
    }
  }
}
