export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
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
      client_media_submissions: {
        Row: {
          client_email: string | null
          client_name: string
          created_at: string
          id: string
          media_urls: Json
          message: string | null
          project_id: string
          status: string
          submission_date: string
          updated_at: string
        }
        Insert: {
          client_email?: string | null
          client_name: string
          created_at?: string
          id?: string
          media_urls?: Json
          message?: string | null
          project_id: string
          status?: string
          submission_date?: string
          updated_at?: string
        }
        Update: {
          client_email?: string | null
          client_name?: string
          created_at?: string
          id?: string
          media_urls?: Json
          message?: string | null
          project_id?: string
          status?: string
          submission_date?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "client_media_submissions_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      lead_agendamentos: {
        Row: {
          completed_at: string | null
          created_at: string
          created_by: string | null
          data_agendamento: string
          descricao: string | null
          id: string
          lead_id: string
          notification_sent: boolean | null
          original_time: string | null
          postponed_count: number | null
          status: string
          titulo: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          created_by?: string | null
          data_agendamento: string
          descricao?: string | null
          id?: string
          lead_id: string
          notification_sent?: boolean | null
          original_time?: string | null
          postponed_count?: number | null
          status?: string
          titulo: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          created_by?: string | null
          data_agendamento?: string
          descricao?: string | null
          id?: string
          lead_id?: string
          notification_sent?: boolean | null
          original_time?: string | null
          postponed_count?: number | null
          status?: string
          titulo?: string
        }
        Relationships: [
          {
            foreignKeyName: "lead_agendamentos_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
        ]
      }
      lead_notes: {
        Row: {
          created_at: string
          created_by: string | null
          id: string
          lead_id: string
          nota: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          id?: string
          lead_id: string
          nota: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          id?: string
          lead_id?: string
          nota?: string
        }
        Relationships: [
          {
            foreignKeyName: "lead_notes_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
        ]
      }
      leads: {
        Row: {
          cnpj: string | null
          created_at: string
          data_ultimo_contato: string
          email: string | null
          empresa: string
          id: string
          link_blaster: string | null
          link_chat: string | null
          link_confidence_score: number | null
          link_method: string | null
          nome_cliente: string
          observacoes: string | null
          project_id: string | null
          situacao: string
          updated_at: string
          vendedor: string | null
        }
        Insert: {
          cnpj?: string | null
          created_at?: string
          data_ultimo_contato?: string
          email?: string | null
          empresa: string
          id?: string
          link_blaster?: string | null
          link_chat?: string | null
          link_confidence_score?: number | null
          link_method?: string | null
          nome_cliente: string
          observacoes?: string | null
          project_id?: string | null
          situacao?: string
          updated_at?: string
          vendedor?: string | null
        }
        Update: {
          cnpj?: string | null
          created_at?: string
          data_ultimo_contato?: string
          email?: string | null
          empresa?: string
          id?: string
          link_blaster?: string | null
          link_chat?: string | null
          link_confidence_score?: number | null
          link_method?: string | null
          nome_cliente?: string
          observacoes?: string | null
          project_id?: string | null
          situacao?: string
          updated_at?: string
          vendedor?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "leads_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
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
          assigned_programmer: string | null
          blaster_link: string | null
          client_name: string
          client_submission_hash: string | null
          client_type: string | null
          cnpj: string | null
          created_at: string | null
          customization_deadline: string | null
          data_formulario: string | null
          domain: string | null
          email_complementar: string | null
          formulario_preenchido: boolean | null
          hostinger_link: string | null
          id: string
          is_inadimplente: boolean | null
          lead_id: string | null
          manually_archived: boolean | null
          modelo_escolhido: string | null
          observacoes_cliente: string | null
          partner_hash: string | null
          partner_link: string | null
          partner_webhook_url: string | null
          payment_date: string | null
          personalization_id: string | null
          project_source: string | null
          provider_credentials: string | null
          remove_from_hostinger: boolean
          requires_paid_customization: boolean | null
          responsible_name: string | null
          site_ready_date: string | null
          status: string | null
          telefone: string | null
          template: string | null
          updated_at: string | null
        }
        Insert: {
          assigned_programmer?: string | null
          blaster_link?: string | null
          client_name: string
          client_submission_hash?: string | null
          client_type?: string | null
          cnpj?: string | null
          created_at?: string | null
          customization_deadline?: string | null
          data_formulario?: string | null
          domain?: string | null
          email_complementar?: string | null
          formulario_preenchido?: boolean | null
          hostinger_link?: string | null
          id?: string
          is_inadimplente?: boolean | null
          lead_id?: string | null
          manually_archived?: boolean | null
          modelo_escolhido?: string | null
          observacoes_cliente?: string | null
          partner_hash?: string | null
          partner_link?: string | null
          partner_webhook_url?: string | null
          payment_date?: string | null
          personalization_id?: string | null
          project_source?: string | null
          provider_credentials?: string | null
          remove_from_hostinger?: boolean
          requires_paid_customization?: boolean | null
          responsible_name?: string | null
          site_ready_date?: string | null
          status?: string | null
          telefone?: string | null
          template?: string | null
          updated_at?: string | null
        }
        Update: {
          assigned_programmer?: string | null
          blaster_link?: string | null
          client_name?: string
          client_submission_hash?: string | null
          client_type?: string | null
          cnpj?: string | null
          created_at?: string | null
          customization_deadline?: string | null
          data_formulario?: string | null
          domain?: string | null
          email_complementar?: string | null
          formulario_preenchido?: boolean | null
          hostinger_link?: string | null
          id?: string
          is_inadimplente?: boolean | null
          lead_id?: string | null
          manually_archived?: boolean | null
          modelo_escolhido?: string | null
          observacoes_cliente?: string | null
          partner_hash?: string | null
          partner_link?: string | null
          partner_webhook_url?: string | null
          payment_date?: string | null
          personalization_id?: string | null
          project_source?: string | null
          provider_credentials?: string | null
          remove_from_hostinger?: boolean
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
            foreignKeyName: "projects_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "projects_personalization_id_fkey"
            columns: ["personalization_id"]
            isOneToOne: false
            referencedRelation: "site_personalizacoes"
            referencedColumns: ["id"]
          },
        ]
      }
      sales_landing_pages: {
        Row: {
          area_atuacao: string
          cargo: string | null
          cidade_regiao: string | null
          comando_gerado: boolean | null
          cores_preferidas: string | null
          created_at: string
          diferenciais: string | null
          email_profissional: string
          estilo_visual: string | null
          formacao_certificacoes: string | null
          foto_profissional_url: string | null
          id: string
          media_urls: string | null
          mini_bio: string
          nome_completo: string
          principais_servicos: string
          redes_sociais: string | null
          slogan: string | null
          status: string
          telefone_whatsapp: string
          updated_at: string
        }
        Insert: {
          area_atuacao: string
          cargo?: string | null
          cidade_regiao?: string | null
          comando_gerado?: boolean | null
          cores_preferidas?: string | null
          created_at?: string
          diferenciais?: string | null
          email_profissional: string
          estilo_visual?: string | null
          formacao_certificacoes?: string | null
          foto_profissional_url?: string | null
          id?: string
          media_urls?: string | null
          mini_bio: string
          nome_completo: string
          principais_servicos: string
          redes_sociais?: string | null
          slogan?: string | null
          status?: string
          telefone_whatsapp: string
          updated_at?: string
        }
        Update: {
          area_atuacao?: string
          cargo?: string | null
          cidade_regiao?: string | null
          comando_gerado?: boolean | null
          cores_preferidas?: string | null
          created_at?: string
          diferenciais?: string | null
          email_profissional?: string
          estilo_visual?: string | null
          formacao_certificacoes?: string | null
          foto_profissional_url?: string | null
          id?: string
          media_urls?: string | null
          mini_bio?: string
          nome_completo?: string
          principais_servicos?: string
          redes_sociais?: string | null
          slogan?: string | null
          status?: string
          telefone_whatsapp?: string
          updated_at?: string
        }
        Relationships: []
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
          estilo_visual: string | null
          fonte: string | null
          horario_funcionamento: string | null
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
          estilo_visual?: string | null
          fonte?: string | null
          horario_funcionamento?: string | null
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
          estilo_visual?: string | null
          fonte?: string | null
          horario_funcionamento?: string | null
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
      template_iframe_configs: {
        Row: {
          created_at: string
          id: string
          iframe_code: string
          is_active: boolean
          name: string
          template_id: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          iframe_code: string
          is_active?: boolean
          name?: string
          template_id?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          iframe_code?: string
          is_active?: boolean
          name?: string
          template_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "template_iframe_configs_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "templates"
            referencedColumns: ["id"]
          },
        ]
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
        Args: { days_to_add: number; start_date: string }
        Returns: string
      }
      auto_link_leads_projects: {
        Args: Record<PropertyKey, never>
        Returns: {
          confidence_score: number
          lead_id: string
          link_method: string
          project_id: string
        }[]
      }
      calcular_dias_sem_resposta: {
        Args: { data_contato: string }
        Returns: number
      }
      create_bucket_policy: {
        Args: { bucket_name: string }
        Returns: boolean
      }
      extract_blaster_id: {
        Args: { blaster_url: string }
        Returns: string
      }
      get_project_by_submission_hash: {
        Args: { p_hash: string }
        Returns: {
          assigned_programmer: string | null
          blaster_link: string | null
          client_name: string
          client_submission_hash: string | null
          client_type: string | null
          cnpj: string | null
          created_at: string | null
          customization_deadline: string | null
          data_formulario: string | null
          domain: string | null
          email_complementar: string | null
          formulario_preenchido: boolean | null
          hostinger_link: string | null
          id: string
          is_inadimplente: boolean | null
          lead_id: string | null
          manually_archived: boolean | null
          modelo_escolhido: string | null
          observacoes_cliente: string | null
          partner_hash: string | null
          partner_link: string | null
          partner_webhook_url: string | null
          payment_date: string | null
          personalization_id: string | null
          project_source: string | null
          provider_credentials: string | null
          remove_from_hostinger: boolean
          requires_paid_customization: boolean | null
          responsible_name: string | null
          site_ready_date: string | null
          status: string | null
          telefone: string | null
          template: string | null
          updated_at: string | null
        }
      }
      string_similarity: {
        Args: { str1: string; str2: string }
        Returns: number
      }
      validate_auth_token: {
        Args: { token_input: string }
        Returns: {
          is_valid: boolean
          partner_id: string
          partner_name: string
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
