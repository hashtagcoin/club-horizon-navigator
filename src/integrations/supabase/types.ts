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
      club_cards: {
        Row: {
          address: string | null
          area: string | null
          friday_hours: string | null
          id: number
          latitude: number | null
          location: string | null
          longitude: number | null
          monday_hours: string | null
          name: string | null
          phone: string | null
          place_id: string | null
          price_level: string | null
          rating: number | null
          saturday_hours: string | null
          sunday_hours: string | null
          thursday_hours: string | null
          traffic: string | null
          tuesday_hours: string | null
          venue_type: string | null
          website: string | null
          wednesday_hours: string | null
        }
        Insert: {
          address?: string | null
          area?: string | null
          friday_hours?: string | null
          id?: number
          latitude?: number | null
          location?: string | null
          longitude?: number | null
          monday_hours?: string | null
          name?: string | null
          phone?: string | null
          place_id?: string | null
          price_level?: string | null
          rating?: number | null
          saturday_hours?: string | null
          sunday_hours?: string | null
          thursday_hours?: string | null
          traffic?: string | null
          tuesday_hours?: string | null
          venue_type?: string | null
          website?: string | null
          wednesday_hours?: string | null
        }
        Update: {
          address?: string | null
          area?: string | null
          friday_hours?: string | null
          id?: number
          latitude?: number | null
          location?: string | null
          longitude?: number | null
          monday_hours?: string | null
          name?: string | null
          phone?: string | null
          place_id?: string | null
          price_level?: string | null
          rating?: number | null
          saturday_hours?: string | null
          sunday_hours?: string | null
          thursday_hours?: string | null
          traffic?: string | null
          tuesday_hours?: string | null
          venue_type?: string | null
          website?: string | null
          wednesday_hours?: string | null
        }
        Relationships: []
      }
      club_cards_duplicate: {
        Row: {
          address: string | null
          area: string | null
          friday_hours: string | null
          id: number
          latitude: number | null
          location: string | null
          longitude: number | null
          monday_hours: string | null
          name: string | null
          phone: string | null
          place_id: string | null
          price_level: string | null
          rating: number | null
          saturday_hours: string | null
          sunday_hours: string | null
          thursday_hours: string | null
          traffic: string | null
          tuesday_hours: string | null
          venue_type: string | null
          website: string | null
          wednesday_hours: string | null
        }
        Insert: {
          address?: string | null
          area?: string | null
          friday_hours?: string | null
          id?: number
          latitude?: number | null
          location?: string | null
          longitude?: number | null
          monday_hours?: string | null
          name?: string | null
          phone?: string | null
          place_id?: string | null
          price_level?: string | null
          rating?: number | null
          saturday_hours?: string | null
          sunday_hours?: string | null
          thursday_hours?: string | null
          traffic?: string | null
          tuesday_hours?: string | null
          venue_type?: string | null
          website?: string | null
          wednesday_hours?: string | null
        }
        Update: {
          address?: string | null
          area?: string | null
          friday_hours?: string | null
          id?: number
          latitude?: number | null
          location?: string | null
          longitude?: number | null
          monday_hours?: string | null
          name?: string | null
          phone?: string | null
          place_id?: string | null
          price_level?: string | null
          rating?: number | null
          saturday_hours?: string | null
          sunday_hours?: string | null
          thursday_hours?: string | null
          traffic?: string | null
          tuesday_hours?: string | null
          venue_type?: string | null
          website?: string | null
          wednesday_hours?: string | null
        }
        Relationships: []
      }
      club_lIst_Sydney: {
        Row: {
          address: string | null
          area: string | null
          friday_hours_close: string | null
          friday_hours_open: string | null
          latitude: number | null
          location: string | null
          longitude: number | null
          monday_hours_close: string | null
          monday_hours_open: string | null
          name: string | null
          phone: string | null
          place_id: string | null
          price_level: number | null
          rating: number | null
          saturday_hours_close: string | null
          saturday_hours_open: string | null
          sunday_hours_close: string | null
          sunday_hours_open: string | null
          thursday_hours_close: string | null
          thursday_hours_open: string | null
          tuesday_hours_close: string | null
          tuesday_hours_open: string | null
          venue_type: string | null
          website: string | null
          wednesday_hours_close: string | null
          wednesday_hours_open: string | null
        }
        Insert: {
          address?: string | null
          area?: string | null
          friday_hours_close?: string | null
          friday_hours_open?: string | null
          latitude?: number | null
          location?: string | null
          longitude?: number | null
          monday_hours_close?: string | null
          monday_hours_open?: string | null
          name?: string | null
          phone?: string | null
          place_id?: string | null
          price_level?: number | null
          rating?: number | null
          saturday_hours_close?: string | null
          saturday_hours_open?: string | null
          sunday_hours_close?: string | null
          sunday_hours_open?: string | null
          thursday_hours_close?: string | null
          thursday_hours_open?: string | null
          tuesday_hours_close?: string | null
          tuesday_hours_open?: string | null
          venue_type?: string | null
          website?: string | null
          wednesday_hours_close?: string | null
          wednesday_hours_open?: string | null
        }
        Update: {
          address?: string | null
          area?: string | null
          friday_hours_close?: string | null
          friday_hours_open?: string | null
          latitude?: number | null
          location?: string | null
          longitude?: number | null
          monday_hours_close?: string | null
          monday_hours_open?: string | null
          name?: string | null
          phone?: string | null
          place_id?: string | null
          price_level?: number | null
          rating?: number | null
          saturday_hours_close?: string | null
          saturday_hours_open?: string | null
          sunday_hours_close?: string | null
          sunday_hours_open?: string | null
          thursday_hours_close?: string | null
          thursday_hours_open?: string | null
          tuesday_hours_close?: string | null
          tuesday_hours_open?: string | null
          venue_type?: string | null
          website?: string | null
          wednesday_hours_close?: string | null
          wednesday_hours_open?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      random_traffic: {
        Args: Record<PropertyKey, never>
        Returns: Database["public"]["Enums"]["traffic_level"]
      }
    }
    Enums: {
      continents:
        | "Africa"
        | "Antarctica"
        | "Asia"
        | "Europe"
        | "Oceania"
        | "North America"
        | "South America"
      traffic_level: "Low" | "Medium" | "High"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
