<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Employee;
use App\Models\File;
/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Privilege>
 */
class PrivilegeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
           'employee_id' => Employee::factory(), // Ako želite da automatski kreirate povezanog zaposlenog
            'file_id' => File::factory(), // Ako želite da automatski kreirate povezani fajl
            'can_view' => $this->faker->boolean,
            'can_edit' => $this->faker->boolean,
            'can_delete' => $this->faker->boolean,
        ];
    }
}
