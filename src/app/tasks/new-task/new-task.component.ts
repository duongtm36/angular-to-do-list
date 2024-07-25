import { Component, ElementRef, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css',
})
export class NewTaskComponent {
  // Tham chiếu đến phần tử form trong HTML
  private formEl = viewChild<ElementRef<HTMLFormElement>>('form');

  // khởi tạo tasksService trong contructor
  constructor(private tasksService: TasksService) {}

  // Hàm xử lý khi thêm một task mới
  onAddTask(title: string, description: string) {
    // Gọi hàm addTask từ TasksService để thêm task mới
    this.tasksService.addTask({ title, description });
    // Reset lại form sau khi thêm task thành công
    this.formEl()?.nativeElement.reset();
  }
}
