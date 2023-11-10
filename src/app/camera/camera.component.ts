import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss']
})
export class CameraComponent {
  dynamicForm!: FormGroup;
  additionalCriteriasControls!: AbstractControl[];

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.dynamicForm = this.fb.group({
      additionalCriterias: this.fb.array([])
    });

    this.additionalCriteriasControls = this.getAdditionalCriteriasControls();
  }

  addDropdownOption(option: string) {
    const controls = this.dynamicForm.get('additionalCriterias') as FormArray;

    // Check for uniqueness and non-empty values before adding
    const isDuplicate = controls.value.some((control: any) => control.key === option);
    if (!isDuplicate && option.trim() !== '') {
      const control = this.fb.group({
        key: [option],
        value: ['']
      });
      controls.push(control);

      // Update the controls array after addi ng
      this.additionalCriteriasControls = this.getAdditionalCriteriasControls();
    }
  }

  removeDropdownOption(index: number) {
    const controls = this.dynamicForm.get('additionalCriterias') as FormArray;
    controls.removeAt(index);

    // Update the controls array after removing
    this.additionalCriteriasControls = this.getAdditionalCriteriasControls();
  }

  onDropdownChange(event: any) {
    const selectedOption = event.target.value;
    this.addDropdownOption(selectedOption);
  }

  private getAdditionalCriteriasControls(): AbstractControl[] {
    return (this.dynamicForm.get('additionalCriterias') as FormArray).controls;
  }

  getFormGroup(index: number): FormGroup {
    return this.additionalCriteriasControls[index] as FormGroup;
  }

  onSubmit() {
    console.log(this.dynamicForm.value);
  }
 
}
