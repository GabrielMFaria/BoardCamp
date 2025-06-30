import * as customersRepository from "../repositories/customersRepository.js";

export async function getAllCustomers() {
  return await customersRepository.findAllCustomers();
}

export async function createCustomer(customer) {
  const existingCpf = await customersRepository.findCustomerByCpf(customer.cpf);
  if (existingCpf) {
    const error = new Error("CPF já cadastrado");
    error.type = "conflict";
    throw error;
  }

  await customersRepository.insertCustomer(customer);
}

export async function findCustomerById(id) {
  return await customersRepository.findCustomerById(id);
}