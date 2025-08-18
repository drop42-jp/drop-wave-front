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
      admin_users: {
        Row: {
          created_at: string
          email: string
          id: string
          role: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          role?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          role?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      cart_items: {
        Row: {
          cart_id: string | null
          id: string
          product_id: string | null
          quantity: number
        }
        Insert: {
          cart_id?: string | null
          id?: string
          product_id?: string | null
          quantity: number
        }
        Update: {
          cart_id?: string | null
          id?: string
          product_id?: string | null
          quantity?: number
        }
        Relationships: [
          {
            foreignKeyName: "cart_items_cart_id_fkey"
            columns: ["cart_id"]
            isOneToOne: false
            referencedRelation: "carts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cart_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      carts: {
        Row: {
          created_at: string | null
          customer_id: string | null
          id: string
          session_id: string | null
          store_id: string | null
        }
        Insert: {
          created_at?: string | null
          customer_id?: string | null
          id?: string
          session_id?: string | null
          store_id?: string | null
        }
        Update: {
          created_at?: string | null
          customer_id?: string | null
          id?: string
          session_id?: string | null
          store_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "carts_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "store_customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "carts_store_id_fkey"
            columns: ["store_id"]
            isOneToOne: false
            referencedRelation: "stores"
            referencedColumns: ["id"]
          },
        ]
      }
      generated_images: {
        Row: {
          created_at: string | null
          id: string
          image_type: string
          openai_response_id: string | null
          prompt: string | null
          s3_url: string
          store_id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          image_type: string
          openai_response_id?: string | null
          prompt?: string | null
          s3_url: string
          store_id: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          image_type?: string
          openai_response_id?: string | null
          prompt?: string | null
          s3_url?: string
          store_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "generated_images_store_id_fkey"
            columns: ["store_id"]
            isOneToOne: false
            referencedRelation: "stores"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "generated_images_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users_extended"
            referencedColumns: ["id"]
          },
        ]
      }
      order_items: {
        Row: {
          id: string
          order_id: string | null
          price: number
          product_id: string | null
          quantity: number
        }
        Insert: {
          id?: string
          order_id?: string | null
          price: number
          product_id?: string | null
          quantity: number
        }
        Update: {
          id?: string
          order_id?: string | null
          price?: number
          product_id?: string | null
          quantity?: number
        }
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          created_at: string | null
          customer_id: string | null
          id: string
          status: string
          store_id: string | null
          stripe_session_id: string | null
          total_amount: number
        }
        Insert: {
          created_at?: string | null
          customer_id?: string | null
          id?: string
          status: string
          store_id?: string | null
          stripe_session_id?: string | null
          total_amount: number
        }
        Update: {
          created_at?: string | null
          customer_id?: string | null
          id?: string
          status?: string
          store_id?: string | null
          stripe_session_id?: string | null
          total_amount?: number
        }
        Relationships: [
          {
            foreignKeyName: "orders_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "store_customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_store_id_fkey"
            columns: ["store_id"]
            isOneToOne: false
            referencedRelation: "stores"
            referencedColumns: ["id"]
          },
        ]
      }
      printify_product_embeddings: {
        Row: {
          brand: string | null
          description: string | null
          embedding: string | null
          id: number
          images: string[] | null
          model: string | null
          product_id: string | null
          title: string | null
        }
        Insert: {
          brand?: string | null
          description?: string | null
          embedding?: string | null
          id?: number
          images?: string[] | null
          model?: string | null
          product_id?: string | null
          title?: string | null
        }
        Update: {
          brand?: string | null
          description?: string | null
          embedding?: string | null
          id?: number
          images?: string[] | null
          model?: string | null
          product_id?: string | null
          title?: string | null
        }
        Relationships: []
      }
      products: {
        Row: {
          category: string | null
          created_at: string | null
          description: string | null
          dropdate: string | null
          id: string
          image_url: string | null
          inventory: number | null
          isdrop: boolean | null
          name: string
          price: number
          sku: string | null
          store_id: string | null
          variant_id: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          dropdate?: string | null
          id?: string
          image_url?: string | null
          inventory?: number | null
          isdrop?: boolean | null
          name: string
          price: number
          sku?: string | null
          store_id?: string | null
          variant_id?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          dropdate?: string | null
          id?: string
          image_url?: string | null
          inventory?: number | null
          isdrop?: boolean | null
          name?: string
          price?: number
          sku?: string | null
          store_id?: string | null
          variant_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "products_store_id_fkey"
            columns: ["store_id"]
            isOneToOne: false
            referencedRelation: "stores"
            referencedColumns: ["id"]
          },
        ]
      }
      referrals: {
        Row: {
          created_at: string
          id: string
          referred_id: number | null
          referrer_id: number | null
        }
        Insert: {
          created_at?: string
          id?: string
          referred_id?: number | null
          referrer_id?: number | null
        }
        Update: {
          created_at?: string
          id?: string
          referred_id?: number | null
          referrer_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "referrals_referred_id_fkey"
            columns: ["referred_id"]
            isOneToOne: false
            referencedRelation: "waitlist"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "referrals_referrer_id_fkey"
            columns: ["referrer_id"]
            isOneToOne: false
            referencedRelation: "waitlist"
            referencedColumns: ["id"]
          },
        ]
      }
      store_customers: {
        Row: {
          created_at: string | null
          id: string
          name: string | null
          store_id: string | null
        }
        Insert: {
          created_at?: string | null
          id: string
          name?: string | null
          store_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string | null
          store_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "store_customers_store_id_fkey"
            columns: ["store_id"]
            isOneToOne: false
            referencedRelation: "stores"
            referencedColumns: ["id"]
          },
        ]
      }
      store_sessions: {
        Row: {
          created_at: string | null
          id: string
          log: Json | null
          prompt: string | null
          session_type: string
          store_id: string | null
          theme_choices: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          log?: Json | null
          prompt?: string | null
          session_type: string
          store_id?: string | null
          theme_choices?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          log?: Json | null
          prompt?: string | null
          session_type?: string
          store_id?: string | null
          theme_choices?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "store_sessions_store_id_fkey"
            columns: ["store_id"]
            isOneToOne: false
            referencedRelation: "stores"
            referencedColumns: ["id"]
          },
        ]
      }
      stores: {
        Row: {
          ai_generation_complete: boolean
          created_at: string | null
          deployed_url: string | null
          id: string
          name: string
          sandboxId: string | null
          slug: string
          theme_config: Json | null
          user_id: string | null
        }
        Insert: {
          ai_generation_complete?: boolean
          created_at?: string | null
          deployed_url?: string | null
          id?: string
          name: string
          sandboxId?: string | null
          slug: string
          theme_config?: Json | null
          user_id?: string | null
        }
        Update: {
          ai_generation_complete?: boolean
          created_at?: string | null
          deployed_url?: string | null
          id?: string
          name?: string
          sandboxId?: string | null
          slug?: string
          theme_config?: Json | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "stores_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users_extended"
            referencedColumns: ["id"]
          },
        ]
      }
      track_orders: {
        Row: {
          created_at: string | null
          id: string
          product_id: string
          status: string
          store_id: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          product_id: string
          status: string
          store_id: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          product_id?: string
          status?: string
          store_id?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_product"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_store"
            columns: ["store_id"]
            isOneToOne: false
            referencedRelation: "stores"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_user"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users_extended"
            referencedColumns: ["id"]
          },
        ]
      }
      unsubscribe_tokens: {
        Row: {
          created_at: string
          expires_at: string
          id: string
          token: string
          used_at: string | null
          waitlist_id: number
        }
        Insert: {
          created_at?: string
          expires_at?: string
          id?: string
          token: string
          used_at?: string | null
          waitlist_id: number
        }
        Update: {
          created_at?: string
          expires_at?: string
          id?: string
          token?: string
          used_at?: string | null
          waitlist_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "unsubscribe_tokens_waitlist_id_fkey"
            columns: ["waitlist_id"]
            isOneToOne: false
            referencedRelation: "waitlist"
            referencedColumns: ["id"]
          },
        ]
      }
      user_generated_images: {
        Row: {
          generated_images: Json | null
          user_id: string
        }
        Insert: {
          generated_images?: Json | null
          user_id: string
        }
        Update: {
          generated_images?: Json | null
          user_id?: string
        }
        Relationships: []
      }
      users_extended: {
        Row: {
          created_at: string | null
          domain: string | null
          fullName: string | null
          id: string
          instagramUrl: string | null
          role: string
          tiktokUrl: string | null
        }
        Insert: {
          created_at?: string | null
          domain?: string | null
          fullName?: string | null
          id: string
          instagramUrl?: string | null
          role?: string
          tiktokUrl?: string | null
        }
        Update: {
          created_at?: string | null
          domain?: string | null
          fullName?: string | null
          id?: string
          instagramUrl?: string | null
          role?: string
          tiktokUrl?: string | null
        }
        Relationships: []
      }
      waitlist: {
        Row: {
          audience_size: string
          content_platform: string
          created_at: string
          creator_type: string
          current_revenue: string | null
          data_quality_issues: string[] | null
          email: string
          email_subscribed: boolean | null
          email_verified: boolean | null
          features: string[] | null
          id: number
          message: string | null
          name: string
          points: number | null
          referral_code: string | null
          referral_points: number | null
          updates: boolean | null
          verification_sent_at: string | null
          verification_token: string | null
          verification_token_expires_at: string | null
        }
        Insert: {
          audience_size: string
          content_platform: string
          created_at?: string
          creator_type: string
          current_revenue?: string | null
          data_quality_issues?: string[] | null
          email: string
          email_subscribed?: boolean | null
          email_verified?: boolean | null
          features?: string[] | null
          id?: number
          message?: string | null
          name: string
          points?: number | null
          referral_code?: string | null
          referral_points?: number | null
          updates?: boolean | null
          verification_sent_at?: string | null
          verification_token?: string | null
          verification_token_expires_at?: string | null
        }
        Update: {
          audience_size?: string
          content_platform?: string
          created_at?: string
          creator_type?: string
          current_revenue?: string | null
          data_quality_issues?: string[] | null
          email?: string
          email_subscribed?: boolean | null
          email_verified?: boolean | null
          features?: string[] | null
          id?: number
          message?: string | null
          name?: string
          points?: number | null
          referral_code?: string | null
          referral_points?: number | null
          updates?: boolean | null
          verification_sent_at?: string | null
          verification_token?: string | null
          verification_token_expires_at?: string | null
        }
        Relationships: []
      }
      wave_front_codes: {
        Row: {
          chunk_unique_id: string | null
          content: string | null
          created_at: string | null
          embedding: string | null
          id: string
          metadata: Json | null
          store_id: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          chunk_unique_id?: string | null
          content?: string | null
          created_at?: string | null
          embedding?: string | null
          id: string
          metadata?: Json | null
          store_id: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          chunk_unique_id?: string | null
          content?: string | null
          created_at?: string | null
          embedding?: string | null
          id?: string
          metadata?: Json | null
          store_id?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      wave_front_codes_summary: {
        Row: {
          file_hash: string | null
          file_name: string | null
          id: string
          summary: string | null
        }
        Insert: {
          file_hash?: string | null
          file_name?: string | null
          id?: string
          summary?: string | null
        }
        Update: {
          file_hash?: string | null
          file_name?: string | null
          id?: string
          summary?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      check_admin_status: {
        Args: { email_to_check: string }
        Returns: {
          admin_record_exists: boolean
          is_admin: boolean
          user_exists: boolean
        }[]
      }
      cleanup_expired_unsubscribe_tokens: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      cleanup_expired_verification_tokens: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      generate_unsubscribe_token: {
        Args: { user_email: string }
        Returns: string
      }
      get_waitlist_stats: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
      handle_resubscribe: {
        Args: { user_email: string }
        Returns: Json
      }
      handle_unsubscribe: {
        Args: { unsubscribe_token: string }
        Returns: Json
      }
      is_admin_user: {
        Args: { user_id: string }
        Returns: boolean
      }
      match_printify_products: {
        Args: {
          match_count?: number
          match_threshold?: number
          query_embedding: string
        }
        Returns: {
          content: string
          id: number
          metadata: Json
          similarity: number
        }[]
      }
      wave_front_match_codes: {
        Args: { filter?: Json; query_embedding: string }
        Returns: {
          chunk_unique_id: string
          content: string
          id: string
          metadata: Json
          similarity: number
          store_id: string
          user_id: string
        }[]
      }
    }
    Enums: {
      [_ in never]: never
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
    Enums: {},
  },
} as const
