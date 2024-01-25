import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ FormsModule ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {

  constructor(private toastr: ToastrService) { }
  
  onSubmit() {
    this.toastr.success('Contact form send', '', {
      positionClass: 'toast-bottom-right'
    });
  }
}
