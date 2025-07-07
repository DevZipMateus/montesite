import React from 'react';
import FadeIn from '@/components/animations/FadeIn';
import { Button } from '@/components/ui/button';
import ShowcaseCard from '@/components/ShowcaseCard';
import { useQuery } from '@tanstack/react-query';
import { Loader2, ExternalLink } from 'lucide-react';
import { fetchShowcases } from '@/services/showcaseService';
import { Link } from 'react-router-dom';
const ShowcaseSection: React.FC = () => {
  const {
    data: showcasesData = [],
    isLoading: isLoadingShowcases
  } = useQuery({
    queryKey: ['featured-showcases'],
    queryFn: () => fetchShowcases(undefined, true, 3) // Get only featured items, limit to 3
  });
  return;
};
export default ShowcaseSection;