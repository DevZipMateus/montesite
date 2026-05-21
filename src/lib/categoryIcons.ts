// Mapeia palavras-chave do nome da categoria a um ícone Lucide apropriado.
// Usado como fallback quando uma categoria não possui um ícone explicitamente cadastrado.

const KEYWORD_TO_ICON: Array<[RegExp, string]> = [
  [/\b(tod[oa]s|all)\b/i, 'LayoutGrid'],
  [/restaurante|food|comida|gastronom|lanchonete|pizza|hamb/i, 'UtensilsCrossed'],
  [/caf[eé]|coffee|padaria|bakery/i, 'Coffee'],
  [/bar|drink|bebida|pub/i, 'Wine'],
  [/loja|shop|store|ecommerce|e-commerce|com[eé]rcio|varejo/i, 'ShoppingBag'],
  [/moda|fashion|roupa|vestu[aá]rio|boutique/i, 'Shirt'],
  [/beleza|sal[aã]o|barbearia|barber|est[eé]tica|spa/i, 'Scissors'],
  [/sa[uú]de|cl[ií]nica|m[eé]dic|hospital|odont|dentist/i, 'Stethoscope'],
  [/farm[aá]cia|drogaria|pharma/i, 'Pill'],
  [/fitness|academia|gym|treino|cross/i, 'Dumbbell'],
  [/yoga|medita|wellness|bem[- ]?estar/i, 'HeartPulse'],
  [/esporte|sport|futebol|basquete/i, 'Trophy'],
  [/educa|escola|curso|aula|ensino|school|university|faculdade/i, 'GraduationCap'],
  [/livr|biblio|leitura|book/i, 'BookOpen'],
  [/tecnolog|tech|software|app|sistema|saas|startup/i, 'Cpu'],
  [/desenvolv|programa|c[oó]digo|code|dev/i, 'Code'],
  [/design|criativ|art|portfolio|portif[oó]lio|estudio|studio/i, 'Palette'],
  [/foto|fotograf|photo/i, 'Camera'],
  [/v[ií]deo|filme|cinema|produtora|streaming/i, 'Film'],
  [/m[uú]sic|banda|dj|audio|podcast/i, 'Music'],
  [/jog|game|gaming/i, 'Gamepad2'],
  [/im[oó]ve|imobili|real ?estate|aluguel|casa|apartament/i, 'Home'],
  [/constru|reforma|arquitet|engenharia|obra/i, 'HardHat'],
  [/autom[oó]ve|carro|ve[ií]culo|oficina|auto|car/i, 'Car'],
  [/viag|turismo|travel|hotel|pousada|hosped/i, 'Plane'],
  [/evento|festa|casamento|wedding|cerimon/i, 'PartyPopper'],
  [/igreja|church|religi/i, 'Church'],
  [/pet|animal|veterin[aá]ri/i, 'PawPrint'],
  [/jardim|paisag|garden|plant/i, 'Leaf'],
  [/limpeza|servi[cç]o|clean/i, 'Sparkles'],
  [/advog|jur[ií]dic|law|legal/i, 'Scale'],
  [/financ|cont[aá]bil|contador|bank|invest/i, 'Landmark'],
  [/consult|coach|mentor/i, 'Briefcase'],
  [/marketing|agencia|ag[eê]ncia|publicidade|m[ií]dia/i, 'Megaphone'],
  [/blog|not[ií]cia|news|jornal|revista/i, 'Newspaper'],
  [/igreja|ong|social|caridade/i, 'HandHeart'],
  [/transport|log[ií]stica|delivery|entrega/i, 'Truck'],
  [/ind[uú]stri|f[aá]brica|manufatura/i, 'Factory'],
  [/agro|fazenda|rural|agricultura/i, 'Tractor'],
];

export const getCategoryIcon = (
  explicitIcon?: string | null,
  name?: string | null,
): string => {
  if (explicitIcon && String(explicitIcon).trim()) {
    const trimmed = String(explicitIcon).trim();
    return trimmed.startsWith('lucide:') ? trimmed.split(':')[1] : trimmed;
  }
  const n = (name || '').toLowerCase();
  for (const [regex, icon] of KEYWORD_TO_ICON) {
    if (regex.test(n)) return icon;
  }
  return 'LayoutTemplate';
};
