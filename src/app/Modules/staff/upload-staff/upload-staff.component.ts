import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-upload-staff',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './upload-staff.component.html',
  styleUrl: './upload-staff.component.css'
})
export class UploadStaffComponent {

  url: string | ArrayBuffer | null = null;
  isCollapsed: boolean = true; // Start with the image collapsed

  // Handle file selection and image preview
  onFileSelected(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        this.isCollapsed = !this.isCollapsed;
        this.url = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  // Toggle image collapse
  toggleImage(): void {
    this.isCollapsed = !this.isCollapsed;
  }
  

}
