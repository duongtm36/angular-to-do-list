import { FormsModule } from '@angular/forms';
import { Component, computed, inject, input } from '@angular/core';

import { Task, TaskStatus } from '../../task.model';
import { TasksService } from '../../tasks.service';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.css',
})
export class TaskItemComponent {
  private tasksService = inject(TasksService);
  task = input.required<Task>();
  taskStatus = computed(() => {
    switch (this.task().status) {
      case 'OPEN':
        return 'Open';
      case 'IN_PROGRESS':
        return 'Working on it';
      case 'DONE':
        return 'Completed';
      default:
        return 'Open';
    }
  });

  onChangeTaskStatus(taskId: string, status: string) {
    // tạo biến newStatus và gán giá trị mặc định là 'OPEN'
    let newStatus: TaskStatus = 'OPEN';

    // tạo switch case để thay đổi giá trị của biến newStatus ty theo giá trị của biến status
    switch (status) {
      case 'open':
        newStatus = 'OPEN';
        break;
      case 'in-progress':
        newStatus = 'IN_PROGRESS';
        break;
      case 'done':
        newStatus = 'DONE';
        break;
      default:
        break;
    }

    // gọi hàm updateTaskStatus từ tasksService để cập nhật trạng thái của task
    this.tasksService.updateTaskStatus(taskId, newStatus);
  }
}
