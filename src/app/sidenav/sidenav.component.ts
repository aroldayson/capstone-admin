import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [RouterOutlet,CommonModule,RouterLink,RouterModule],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css'
})
export class SidenavComponent {
  isOpen: boolean = true;

  constructor(
    private admin: AdminService,
    private router: Router
  ){}

  toggleNav(): void {
    this.isOpen = !this.isOpen;
  }
  logout():  void{
    console.log('Success')
    this.admin.logout().subscribe((result: any) => {
      this.router.navigate(['/main']);
      console.log(result)
    });
  }

}
