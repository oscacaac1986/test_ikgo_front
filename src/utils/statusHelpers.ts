export const getStatusColor = (status: string) => {
    switch (status) {
      case 'vigente':
        return 'bg-green-100';
      case 'por_vencer':
        return 'bg-yellow-100';
      case 'vencido':
        return 'bg-red-100';
      default:
        return '';
    }
  };
  
  export const formatStatus = (status: string) => {
    return status.replace('_', ' ');
  };