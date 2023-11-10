import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
 
 
  dynamicForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.dynamicForm = this.fb.group({
      additionalCriterias: this.fb.array([])
    });
  }

  addDropdownOption(option: string) {
    const controls = this.dynamicForm.get('additionalCriterias') as FormArray;

    // Check for uniqueness and non-empty values before adding
    const isDuplicate = controls.value.some((control: any) => control.key === option);
    console.log(isDuplicate);
    if(isDuplicate){ alert('Already Selected This Field!')}
    
    if (!isDuplicate && option.trim() !== '') {
      const control = this.fb.group({
        key: [option],
        value: ['']
      });
      controls.push(control);
    }
  }

  removeDropdownOption(index: number) {
    const controls = this.dynamicForm.get('additionalCriterias') as FormArray;
    controls.removeAt(index);
  }

  onDropdownChange(event: any) {
    const selectedOption = event.target.value;
    this.addDropdownOption(selectedOption);
  }

  get additionalCriteriasControls(): FormGroup[] {
    return (this.dynamicForm.get('additionalCriterias') as FormArray).controls as FormGroup[];
  }

  onSubmit() {
    console.log(this.dynamicForm.value);
  }


}
