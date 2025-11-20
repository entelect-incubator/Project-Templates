export * from './order.service';
import { OrderService } from './order.service';
export * from './order.serviceInterface';
export * from './pizza.service';
import { PizzaService } from './pizza.service';
export * from './pizza.serviceInterface';
export const APIS = [OrderService, PizzaService];
