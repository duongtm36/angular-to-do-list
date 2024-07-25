// giới hạn giá trị của biến có thể nhận vào.
// làm rõ ràng, cụ thể đầu vào.
export type TaskStatus = 'OPEN' | 'IN_PROGRESS' | 'DONE';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
}
