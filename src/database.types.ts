export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
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
      products: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          image_url: string | null
          inventory: number | null
          name: string
          price: number
          sku: string | null
          store_id: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          inventory?: number | null
          name: string
          price: number
          sku?: string | null
          store_id?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          inventory?: number | null
          name?: string
          price?: number
          sku?: string | null
          store_id?: string | null
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
          session_type: string
          store_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          log?: Json | null
          session_type: string
          store_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          log?: Json | null
          session_type?: string
          store_id?: string | null
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
          created_at: string | null
          id: string
          name: string
          slug: string
          theme_config: Json | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
          slug: string
          theme_config?: Json | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
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
      users_extended: {
        Row: {
          created_at: string | null
          id: string
          role: string
        }
        Insert: {
          created_at?: string | null
          id: string
          role?: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: string
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
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      check_admin_status: {
        Args: { email_to_check: string }
        Returns: {
          user_exists: boolean
          is_admin: boolean
          admin_record_exists: boolean
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
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
