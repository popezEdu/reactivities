import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import agent from "../api/agent";

import { useLocation } from "react-router"; 

export const useActivities = (id? : string) => {
  const queryClient = useQueryClient();
  const location = useLocation();

  // Sobre UseQuery
  // Los métodos que implementan useQuery en React Query se ejecutan automáticamente cuando el componente que los utiliza se monta o se renderiza inicialmente
  // o cuando se cumplen las condiciones especificadas en la configuración (como enabled: true y staleTime expirado). 
  // React Query maneja la obtención de datos, el almacenamiento en caché y la actualización de forma automática.

  const { data: activities, isPending } = useQuery({
    queryKey: ["activities"],
    queryFn: async () => {
      const response = await agent.get<IActivity[]>("/activities");
      return response.data;
    },
    // Con esto nos aseguramos de no volver a hacer la petición si ya tenemos los datos
    // y de que se mantengan actualizados durante 5 minutos
    // staleTime: 1000 * 60 * 5, // 5 minutes

    // Only run this query if id is not provided and the path is "/activities"
    enabled: !id && location.pathname === "/activities", 
  });

  const {data: activity, isLoading: isLoadingActivity} = useQuery({
    queryKey: ["activities", id],
    queryFn: async () => {
      const response = await agent.get<IActivity>(`/activities/${id}`);
      return response.data;
    },
    enabled: !!id, // Only run this query if id is provided
  })

  const updateActivity = useMutation({
    mutationFn: async (activity: IActivity) => {
      await agent.put<IActivity>("/activities", activity);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["activities"] });
    },
  });

  const createActivity = useMutation({
    mutationFn: async (activity: IActivity) => {
      const response = await agent.post<IActivity>("/activities", activity);
      return response.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["activities"] });
    },
  });

  const deleteActivity = useMutation({
    mutationFn: async (id: string) => {
      await agent.delete(`/activities/${id}`);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["activities"] });
    },
  });

  return { activities, isPending, updateActivity, createActivity , deleteActivity, activity, isLoadingActivity};
};
