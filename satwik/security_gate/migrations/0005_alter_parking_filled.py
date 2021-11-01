# Generated by Django 3.2 on 2021-10-20 10:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('security_gate', '0004_alter_gate_log_name'),
    ]

    operations = [
        migrations.AlterField(
            model_name='parking',
            name='filled',
            field=models.CharField(choices=[('Filled', 'Filled'), ('Empty', 'Empty')], max_length=10, verbose_name='Status'),
        ),
    ]