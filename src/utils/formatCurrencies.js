export default function formatBRL(value) {
  return (value * 0.01).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}
