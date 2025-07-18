export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      auth_logs: {
        Row: {
          created_at: string | null
          error_message: string | null
          id: string
          partner_id: string | null
          request_headers: Json | null
          request_ip: string | null
          success: boolean
          token_used: string | null
        }
        Insert: {
          created_at?: string | null
          error_message?: string | null
          id?: string
          partner_id?: string | null
          request_headers?: Json | null
          request_ip?: string | null
          success: boolean
          token_used?: string | null
        }
        Update: {
          created_at?: string | null
          error_message?: string | null
          id?: string
          partner_id?: string | null
          request_headers?: Json | null
          request_ip?: string | null
          success?: boolean
          token_used?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "auth_logs_partner_id_fkey"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "partners"
            referencedColumns: ["id"]
          },
        ]
      }
      categories: {
        Row: {
          created_at: string
          icon: string | null
          id: string
          name: string
          slug: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          icon?: string | null
          id?: string
          name: string
          slug: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          icon?: string | null
          id?: string
          name?: string
          slug?: string
          updated_at?: string
        }
        Relationships: []
      }
      model_templates: {
        Row: {
          created_at: string | null
          custom_url: string | null
          description: string
          id: string
          image_url: string
          name: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          custom_url?: string | null
          description: string
          id?: string
          image_url?: string
          name: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          custom_url?: string | null
          description?: string
          id?: string
          image_url?: string
          name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      partners: {
        Row: {
          active: boolean | null
          auth_token: string | null
          created_at: string | null
          hash: string
          id: string
          last_used_at: string | null
          name: string
          token_expires_at: string | null
          token_hash: string | null
          updated_at: string | null
          webhook_url: string | null
        }
        Insert: {
          active?: boolean | null
          auth_token?: string | null
          created_at?: string | null
          hash: string
          id?: string
          last_used_at?: string | null
          name: string
          token_expires_at?: string | null
          token_hash?: string | null
          updated_at?: string | null
          webhook_url?: string | null
        }
        Update: {
          active?: boolean | null
          auth_token?: string | null
          created_at?: string | null
          hash?: string
          id?: string
          last_used_at?: string | null
          name?: string
          token_expires_at?: string | null
          token_hash?: string | null
          updated_at?: string | null
          webhook_url?: string | null
        }
        Relationships: []
      }
      project_customizations: {
        Row: {
          completed_at: string | null
          created_at: string | null
          description: string
          id: string
          notes: string | null
          priority: Database["public"]["Enums"]["customization_priority"]
          project_id: string
          requested_at: string
          status: Database["public"]["Enums"]["customization_status"]
          updated_at: string | null
        }
        Insert: {
          completed_at?: string | null
          created_at?: string | null
          description: string
          id?: string
          notes?: string | null
          priority?: Database["public"]["Enums"]["customization_priority"]
          project_id: string
          requested_at?: string
          status?: Database["public"]["Enums"]["customization_status"]
          updated_at?: string | null
        }
        Update: {
          completed_at?: string | null
          created_at?: string | null
          description?: string
          id?: string
          notes?: string | null
          priority?: Database["public"]["Enums"]["customization_priority"]
          project_id?: string
          requested_at?: string
          status?: Database["public"]["Enums"]["customization_status"]
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "project_customizations_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          blaster_link: string | null
          client_name: string
          client_type: string | null
          cnpj: string | null
          created_at: string | null
          customization_deadline: string | null
          data_formulario: string | null
          domain: string | null
          email_complementar: string | null
          formulario_preenchido: boolean | null
          id: string
          modelo_escolhido: string | null
          observacoes_cliente: string | null
          partner_hash: string | null
          partner_link: string | null
          partner_webhook_url: string | null
          personalization_id: string | null
          project_source: string | null
          provider_credentials: string | null
          requires_paid_customization: boolean | null
          responsible_name: string | null
          site_ready_date: string | null
          status: string | null
          telefone: string | null
          template: string | null
          updated_at: string | null
        }
        Insert: {
          blaster_link?: string | null
          client_name: string
          client_type?: string | null
          cnpj?: string | null
          created_at?: string | null
          customization_deadline?: string | null
          data_formulario?: string | null
          domain?: string | null
          email_complementar?: string | null
          formulario_preenchido?: boolean | null
          id?: string
          modelo_escolhido?: string | null
          observacoes_cliente?: string | null
          partner_hash?: string | null
          partner_link?: string | null
          partner_webhook_url?: string | null
          personalization_id?: string | null
          project_source?: string | null
          provider_credentials?: string | null
          requires_paid_customization?: boolean | null
          responsible_name?: string | null
          site_ready_date?: string | null
          status?: string | null
          telefone?: string | null
          template?: string | null
          updated_at?: string | null
        }
        Update: {
          blaster_link?: string | null
          client_name?: string
          client_type?: string | null
          cnpj?: string | null
          created_at?: string | null
          customization_deadline?: string | null
          data_formulario?: string | null
          domain?: string | null
          email_complementar?: string | null
          formulario_preenchido?: boolean | null
          id?: string
          modelo_escolhido?: string | null
          observacoes_cliente?: string | null
          partner_hash?: string | null
          partner_link?: string | null
          partner_webhook_url?: string | null
          personalization_id?: string | null
          project_source?: string | null
          provider_credentials?: string | null
          requires_paid_customization?: boolean | null
          responsible_name?: string | null
          site_ready_date?: string | null
          status?: string | null
          telefone?: string | null
          template?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "projects_personalization_id_fkey"
            columns: ["personalization_id"]
            isOneToOne: false
            referencedRelation: "site_personalizacoes"
            referencedColumns: ["id"]
          },
        ]
      }
      showcases: {
        Row: {
          category_id: string | null
          client_name: string
          created_at: string
          description: string | null
          featured: boolean | null
          id: string
          image_url: string
          site_url: string
          updated_at: string
        }
        Insert: {
          category_id?: string | null
          client_name: string
          created_at?: string
          description?: string | null
          featured?: boolean | null
          id?: string
          image_url: string
          site_url: string
          updated_at?: string
        }
        Update: {
          category_id?: string | null
          client_name?: string
          created_at?: string
          description?: string | null
          featured?: boolean | null
          id?: string
          image_url?: string
          site_url?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "showcases_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      site_personalizacoes: {
        Row: {
          botaowhatsapp: boolean | null
          created_at: string | null
          depoimento_urls: string[] | null
          depoimentos: string | null
          descricao: string
          email: string
          endereco: string
          fonte: string | null
          id: string
          linkmapa: string | null
          logo_url: string | null
          midia_urls: string[] | null
          modelo: string | null
          officenome: string
          paletacores: string | null
          planos: string | null
          possuimapa: boolean | null
          possuiplanos: boolean | null
          redessociais: string | null
          responsavelnome: string
          servicos: string
          slogan: string | null
          status: string | null
          telefone: string
          updated_at: string | null
        }
        Insert: {
          botaowhatsapp?: boolean | null
          created_at?: string | null
          depoimento_urls?: string[] | null
          depoimentos?: string | null
          descricao: string
          email: string
          endereco: string
          fonte?: string | null
          id?: string
          linkmapa?: string | null
          logo_url?: string | null
          midia_urls?: string[] | null
          modelo?: string | null
          officenome: string
          paletacores?: string | null
          planos?: string | null
          possuimapa?: boolean | null
          possuiplanos?: boolean | null
          redessociais?: string | null
          responsavelnome: string
          servicos: string
          slogan?: string | null
          status?: string | null
          telefone: string
          updated_at?: string | null
        }
        Update: {
          botaowhatsapp?: boolean | null
          created_at?: string | null
          depoimento_urls?: string[] | null
          depoimentos?: string | null
          descricao?: string
          email?: string
          endereco?: string
          fonte?: string | null
          id?: string
          linkmapa?: string | null
          logo_url?: string | null
          midia_urls?: string[] | null
          modelo?: string | null
          officenome?: string
          paletacores?: string | null
          planos?: string | null
          possuimapa?: boolean | null
          possuiplanos?: boolean | null
          redessociais?: string | null
          responsavelnome?: string
          servicos?: string
          slogan?: string | null
          status?: string | null
          telefone?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      templates: {
        Row: {
          category_id: string | null
          created_at: string
          description: string
          form_url: string
          id: string
          image_url: string
          order_index: number | null
          preview_url: string
          status: Database["public"]["Enums"]["template_status"]
          title: string
          updated_at: string
        }
        Insert: {
          category_id?: string | null
          created_at?: string
          description: string
          form_url: string
          id?: string
          image_url: string
          order_index?: number | null
          preview_url: string
          status?: Database["public"]["Enums"]["template_status"]
          title: string
          updated_at?: string
        }
        Update: {
          category_id?: string | null
          created_at?: string
          description?: string
          form_url?: string
          id?: string
          image_url?: string
          order_index?: number | null
          preview_url?: string
          status?: Database["public"]["Enums"]["template_status"]
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "templates_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      webhook_logs: {
        Row: {
          created_at: string | null
          error_message: string | null
          id: string
          payload: Json
          project_id: string | null
          response: string | null
          status: string
          updated_at: string | null
          webhook_type: string
        }
        Insert: {
          created_at?: string | null
          error_message?: string | null
          id?: string
          payload: Json
          project_id?: string | null
          response?: string | null
          status: string
          updated_at?: string | null
          webhook_type: string
        }
        Update: {
          created_at?: string | null
          error_message?: string | null
          id?: string
          payload?: Json
          project_id?: string | null
          response?: string | null
          status?: string
          updated_at?: string | null
          webhook_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "webhook_logs_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      add_business_days: {
        Args: { start_date: string; days_to_add: number }
        Returns: string
      }
      create_bucket_policy: {
        Args: { bucket_name: string }
        Returns: boolean
      }
      validate_auth_token: {
        Args: { token_input: string }
        Returns: {
          partner_id: string
          partner_name: string
          is_valid: boolean
        }[]
      }
    }
    Enums: {
      customization_priority: "Baixa" | "Média" | "Alta" | "Urgente"
      customization_status:
        | "Solicitado"
        | "Em andamento"
        | "Concluído"
        | "Cancelado"
      template_status: "active" | "inactive" | "archived"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      customization_priority: ["Baixa", "Média", "Alta", "Urgente"],
      customization_status: [
        "Solicitado",
        "Em andamento",
        "Concluído",
        "Cancelado",
      ],
      template_status: ["active", "inactive", "archived"],
    },
  },
} as const
