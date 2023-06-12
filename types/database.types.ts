export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      integrations: {
        Row: {
          id: string
          inserted_at: string
          is_active: boolean | null
          login: string | null
          logo: string | null
          name: string
          password: string | null
          token: string | null
          type: Database["public"]["Enums"]["integration_type"] | null
          url: string | null
          user_id: string
          xml_base: string | null
          xml_full: string | null
        }
        Insert: {
          id?: string
          inserted_at?: string
          is_active?: boolean | null
          login?: string | null
          logo?: string | null
          name: string
          password?: string | null
          token?: string | null
          type?: Database["public"]["Enums"]["integration_type"] | null
          url?: string | null
          user_id: string
          xml_base?: string | null
          xml_full?: string | null
        }
        Update: {
          id?: string
          inserted_at?: string
          is_active?: boolean | null
          login?: string | null
          logo?: string | null
          name?: string
          password?: string | null
          token?: string | null
          type?: Database["public"]["Enums"]["integration_type"] | null
          url?: string | null
          user_id?: string
          xml_base?: string | null
          xml_full?: string | null
        }
      }
      profiles: {
        Row: {
          avatar_url: string | null
          full_name: string | null
          id: string
          updated_at: string | null
          username: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          full_name?: string | null
          id: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
      }
      todos: {
        Row: {
          id: number
          inserted_at: string
          is_complete: boolean | null
          status: Database["public"]["Enums"]["enum_todo_status"]
          task: string | null
          user_id: string
        }
        Insert: {
          id?: number
          inserted_at?: string
          is_complete?: boolean | null
          status?: Database["public"]["Enums"]["enum_todo_status"]
          task?: string | null
          user_id: string
        }
        Update: {
          id?: number
          inserted_at?: string
          is_complete?: boolean | null
          status?: Database["public"]["Enums"]["enum_todo_status"]
          task?: string | null
          user_id?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      delete_avatar: {
        Args: {
          avatar_url: string
        }
        Returns: Record<string, unknown>
      }
      delete_storage_object: {
        Args: {
          bucket: string
          object: string
        }
        Returns: Record<string, unknown>
      }
    }
    Enums: {
      enum_todo_status: "To do" | "In progress" | "Done" | "Wont done"
      integration_type:
        | "wholesaler"
        | "marketplace"
        | "delivery"
        | "finance"
        | "shop"
        | "erp"
        | "print"
        | "other"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
