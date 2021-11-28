export const formatBRLInput = (value) => {
  let valor = value;
  valor += "";
  valor = parseInt(valor.replace(/[\D]+/g, ""));
  valor += "";
  valor = valor.replace(/([0-9]{2})$/g, ",$1");
  if (valor.length > 6) {
    valor = valor.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
  }
  if (valor === "NaN") return "";
  return `R$ ${valor}`;
};

export const formatBRL = (value) =>
  (value * 0.01).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
