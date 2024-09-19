export class ApiError extends Error {
  statuscode: number;
  status: string;
  constructor(message: string, statuscode: number) {
    super(message);
    this.statuscode = statuscode;
    this.status = message;
  }
}